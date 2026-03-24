import React from "react"

export function parseMarks(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") {
    const parts = node.split(/\*([^*]+)\*/g)
    if (parts.length === 1) return node
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <em key={i} className="font-serif italic">
          {part}
        </em>
      ) : (
        part
      ),
    )
  }
  if (Array.isArray(node))
    return node.map((child, i) => <React.Fragment key={i}>{parseMarks(child)}</React.Fragment>)
  if (React.isValidElement(node)) {
    const { children } = node.props as { children?: React.ReactNode }
    if (!children) return node
    return React.cloneElement(node, undefined, parseMarks(children))
  }
  return node
}
