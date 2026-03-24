#!/usr/bin/env python3
"""Migrate published blog posts from old site to new stories CSV."""

import csv
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "public", "content")
OLD_BLOG_POSTS = os.path.join(BASE, "old", "blog-posts.csv")
NEW_PEOPLE = os.path.join(BASE, "new", "people.csv")
NEW_CATEGORIES = os.path.join(BASE, "new", "categories.csv")
NEW_STORIES = os.path.join(BASE, "new", "stories.csv")

STORIES_COLLECTION_ID = "69ae0fba0f73ea79dbacb1de"
STORIES_LOCALE_ID = "69ae0fbab3042e626006d4bf"

STORIES_FIELDS = [
    "Name", "Slug", "Collection ID", "Locale ID", "Item ID",
    "Archived", "Draft", "Created On", "Updated On", "Published On",
    "Featured?", "Author", "Category", "Post Summary", "Post Body",
    "Main Image", "Thumbnail image", "Highlights",
]


def build_slug_set(csv_path):
    slugs = set()
    with open(csv_path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            slugs.add(row["Slug"])
    return slugs


def validate_author(slug, people_slugs, warnings):
    if not slug:
        return ""
    if slug not in people_slugs:
        warnings.append(f"Unknown author slug: {slug}")
    return slug


def validate_categories(cats_str, cat_slugs, warnings):
    if not cats_str:
        return ""
    validated = []
    for slug in cats_str.split(";"):
        slug = slug.strip()
        if not slug:
            continue
        if slug not in cat_slugs:
            warnings.append(f"Unknown category slug: {slug}")
        validated.append(slug)
    return ";".join(validated)


def migrate_blog_post(row, people_slugs, cat_slugs, warnings):
    return {
        "Name": row["Name"],
        "Slug": row["Slug"],
        "Collection ID": STORIES_COLLECTION_ID,
        "Locale ID": STORIES_LOCALE_ID,
        "Item ID": "",
        "Archived": row["Archived"],
        "Draft": row["Draft"],
        "Created On": row["Created On"],
        "Updated On": row["Updated On"],
        "Published On": row["Published On"],
        "Featured?": row["Featured"],
        "Author": validate_author(row["Author"], people_slugs, warnings),
        "Category": validate_categories(row["Blog Categories"], cat_slugs, warnings),
        "Post Summary": row["Short Description"],
        "Post Body": row["Main Article Content"],
        "Main Image": "",
        "Thumbnail image": row["Thumbnail"],
        "Highlights": "",
    }


def main():
    people_slugs = build_slug_set(NEW_PEOPLE)
    cat_slugs = build_slug_set(NEW_CATEGORIES)
    warnings = []

    # Read existing stories (keep as-is, just validate refs)
    existing_rows = []
    with open(NEW_STORIES, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            validate_author(row.get("Author", ""), people_slugs, warnings)
            validate_categories(row.get("Category", ""), cat_slugs, warnings)
            existing_rows.append(row)

    # Read and migrate blog posts (skip drafts)
    migrated = []
    skipped_drafts = 0
    with open(OLD_BLOG_POSTS, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["Draft"] == "true":
                skipped_drafts += 1
                continue
            migrated.append(migrate_blog_post(row, people_slugs, cat_slugs, warnings))

    # Combine: existing rows first, then migrated
    all_rows = existing_rows + migrated

    # Write output
    with open(NEW_STORIES, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=STORIES_FIELDS)
        writer.writeheader()
        writer.writerows(all_rows)

    # Summary
    print(f"Existing rows preserved: {len(existing_rows)}")
    print(f"Blog posts migrated:     {len(migrated)}")
    print(f"Drafts skipped:          {skipped_drafts}")
    print(f"Total rows in output:    {len(all_rows)}")

    if warnings:
        print(f"\nWarnings ({len(warnings)}):")
        for w in warnings:
            print(f"  - {w}")
    else:
        print("\nNo warnings.")


if __name__ == "__main__":
    main()
