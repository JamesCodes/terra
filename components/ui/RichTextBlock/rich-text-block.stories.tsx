import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { booleanArg, textArg } from "@/lib/storybook"
import { RichTextBlock } from "./rich-text-block"
import { propLabels } from "./rich-text-block.webflow"

import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Rich Text/Block",
  component: RichTextBlock,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children", "html"],
    },
  },
  tags: ["autodocs"],
  args: {
    title: "Terra Security Privacy Policy",
    subtitle: "Last updated December 24, 2024",
    showTitle: true,
    showSubtitle: true,
  },
  argTypes: {
    title: textArg(propLabels.title),
    subtitle: textArg(propLabels.subtitle),
    showTitle: booleanArg(propLabels.showTitle),
    showSubtitle: booleanArg(propLabels.showSubtitle),
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  render: ({ showTitle, showSubtitle, title, subtitle }: any) => (
    <Section>
      <WebflowSlot>
        <RichTextBlock
          title={showTitle ? title : undefined}
          subtitle={showSubtitle ? subtitle : undefined}
        >
          <p>
            Terra Security Inc. (together with its affiliated companies &ndash; &ldquo;
            <strong>Terra</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;
            <strong>our</strong>&rdquo; or &ldquo;<strong>us</strong>&rdquo;) offer an AI-powered
            offensive security solution designed to analyze organizations&rsquo; ongoing cyber
            threats and vulnerabilities as well as penetration test services (&ldquo;
            <strong>Services</strong>&rdquo;). This Privacy Policy supplements and shall be read in
            conjunction with our <a href="#">Terms and Conditions</a>, and may be supplemented by
            additional privacy statements, terms or notices provided to you.
          </p>
          <p>
            Terra processes Customer Personal Information (i.e. concerning Customer and its
            personnel) in our capacity as a &ldquo;data processor&rdquo; in accordance with the{" "}
            <a href="#">Data Processing Agreement</a>. If you have any questions or requests
            regarding Customer Data, please contact your organization directly.
          </p>

          <h2>1. Your consent</h2>
          <p>
            <strong>
              PLEASE READ THIS PRIVACY POLICY BEFORE ACCESSING AND USING THE SERVICES. BY ACCESSING
              THE SERVICES, YOU AGREE TO THIS PRIVACY POLICY, INCLUDING TO THE COLLECTION AND
              PROCESSING OF YOUR PERSONAL INFORMATION (AS DEFINED BELOW). IF YOU DISAGREE TO ANY
              TERM PROVIDED HEREIN, YOU MAY NOT ACCESS OR USE THE SERVICES.
            </strong>
          </p>
          <p>
            Please note: You hereby acknowledge and agree that you are providing us with Personal
            Information at your own free will and that we may collect and use such Personal
            Information pursuant to this Privacy Policy and any applicable laws and regulations.
          </p>

          <h2>2. What types of information do you collect?</h2>
          <ul>
            <li>
              <strong>Non-Personal Information:</strong> &ldquo;Non-Personal Information&rdquo; is
              un-identified and non-identifiable information pertaining to a user, which may be made
              available to us, or collected automatically via your use of the Services which does
              not enable us to identify the person from whom it was collected.
            </li>
            <li>
              <strong>Personal Information:</strong> &ldquo;Personal Information&rdquo; is
              information that identifies an individual or may with reasonable efforts enable the
              identification of an individual. Personal Information that is collected by us consists
              of the following types:
              <ol>
                <li>
                  <strong>Terra Services</strong>. We collect account registration information from
                  Customers&rsquo; authorized users such as name, phone, organization email address,
                  role, IP address and log-in credentials.
                </li>
                <li>
                  <strong>Prospect Data</strong>. We collect name, organization, role, and email of
                  enterprises representatives who are prospective customers or partners of Terra.
                </li>
                <li>
                  <strong>Employees and Candidates</strong>. We collect name, email, phone, CVs and
                  related information necessary for evaluation of candidates who are interested in
                  working at Terra.
                </li>
              </ol>
            </li>
          </ul>
          <p>
            We do not collect any Personal Information from you or related to you without your
            approval, which is obtained, <em>inter alia</em>, through your acceptance of this
            Privacy Policy.
          </p>
        </RichTextBlock>
      </WebflowSlot>
    </Section>
  ),
}

export const WithTables: Story = {
  args: {
    title: "Cookie Policy",
    subtitle: "Last updated January 15, 2025",
  },
  render: ({ showTitle, showSubtitle, title, subtitle }: any) => (
    <RichTextBlock
      title={showTitle ? title : undefined}
      subtitle={showSubtitle ? subtitle : undefined}
    >
      <h2>9. Do you use cookies or similar tracking technologies?</h2>
      <p>
        We use certain monitoring and tracking technologies, including ones offered by third party
        service providers. These technologies are used in order to maintain, provide and improve our
        Services on an ongoing basis, and in order to provide a better experience to our users. For
        example, these technologies enable us to:
      </p>
      <ol>
        <li>Keep track of our users&rsquo; preferences and authenticated sessions.</li>
        <li>Secure our Services by detecting abnormal behaviors.</li>
        <li>Identify technical issues and improve the overall performance of our Services.</li>
        <li>Create and monitor analytics.</li>
      </ol>
      <p>
        Specifically, we may use cookies in connection with our Services. A &ldquo;Cookie&rdquo; is
        a small data file that is downloaded and stored on your computer or mobile device when you
        visit our Services.
      </p>
      <p>The cookies we use can be classified in one of the following categories:</p>

      <table>
        <tbody>
          <tr>
            <td>
              <strong>Strictly necessary cookies</strong>
            </td>
            <td>
              We use these cookies to enable you to use our Services features, such as enabling
              movement between pages and remembering information you enter on forms. Without these
              necessary cookies, our Services will not be possible.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Security cookies</strong>
            </td>
            <td>
              We use these cookies for security purposes, including detecting abnormal behaviors and
              preventing unauthorized access to our Services.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Performance and Analytics cookies</strong>
            </td>
            <td>
              We use these cookies to collect information about your use of our Services and to help
              improve the way it works.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Functionality and Preference cookies</strong>
            </td>
            <td>
              We use these cookies to remember the choices you make such as which language you
              prefer and to provide you with personalized features.
            </td>
          </tr>
        </tbody>
      </table>

      <p>We use the following third-party Cookies:</p>

      <table>
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Purpose / Functionality</th>
            <th>Policies &amp; Links</th>
            <th>Cookie Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google</td>
            <td>Data Analytics</td>
            <td>https://policies.google.com/privacy</td>
            <td>Performance and Analytics cookies</td>
          </tr>
        </tbody>
      </table>
    </RichTextBlock>
  ),
}

export const WithBlockquote: Story = {
  args: {
    title: "Terms of Service",
    subtitle: "Effective March 1, 2025",
  },
  render: ({ showTitle, showSubtitle, title, subtitle }: any) => (
    <RichTextBlock
      title={showTitle ? title : undefined}
      subtitle={showSubtitle ? subtitle : undefined}
    >
      <p>
        These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) govern your access to and use
        of the Terra platform and services.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using our Services, you agree to be bound by these Terms. If you do not
        agree to these Terms, you may not access or use the Services.
      </p>

      <blockquote>
        Important: These terms constitute a legally binding agreement between you and Terra Security
        Inc. Please read them carefully before proceeding.
      </blockquote>

      <h2>2. Service Description</h2>
      <p>Terra provides an AI-powered offensive security platform that enables organizations to:</p>
      <ul>
        <li>Continuously assess their security posture against real-world threats</li>
        <li>Identify and prioritize vulnerabilities across their digital infrastructure</li>
        <li>Simulate adversary tactics to validate defensive controls</li>
      </ul>

      <hr />

      <h2>3. User Obligations</h2>
      <p>
        As a user of the Services, you agree to comply with all applicable laws and regulations. You
        are responsible for maintaining the confidentiality of your account credentials.
      </p>

      <h3>3.1 Authorized Use</h3>
      <p>
        You may only use the Services for lawful purposes and in accordance with these Terms. You
        agree not to use the Services in any way that could damage, disable, or impair our
        infrastructure.
      </p>

      <h3>3.2 Account Security</h3>
      <p>
        You are responsible for safeguarding your password and for any activities or actions under
        your account. You must notify Terra immediately of any unauthorized use.
      </p>
    </RichTextBlock>
  ),
}
