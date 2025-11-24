export interface PromptVariable {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  description?: string;
  required: boolean;
  defaultValue?: string;
  options?: string[];
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  aiModel: string;
  template: string;
  variables: PromptVariable[];
  tips: string[];
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'deep-research',
    name: 'Deep Research Mega-Prompt',
    description: 'Generate comprehensive research reports with citations and evidence-based analysis',
    category: 'Research',
    aiModel: 'ChatGPT, Claude, Gemini',
    template: `Conduct comprehensive research on {{subject}} and provide a detailed analysis.

Research Question: {{research_question}}

Expertise Level: {{expertise_level}}

Provide your analysis in the following structure:

1. IDENTIFY KEY CHALLENGES
List 5 major challenges in this domain. For each challenge, include verifiable data points with specific source citations (author, publication, year, URL).

2. DETAILED ANALYSIS
For each challenge identified:
- Explain the root causes
- Identify populations most affected
- Describe existing solution attempts
- Cite all factual claims with specific sources

3. INNOVATIVE SOLUTIONS
For each challenge, propose a unique solution:
- Core functionality and purpose
- Key components or features
- Value proposition with cited evidence
- Implementation requirements
- Cite case studies or research papers supporting this approach

4. SOURCES AND EVIDENCE
Provide a numbered list of all sources cited:
- Author(s) and publication date
- Title of work
- Publication/platform
- URL
- Brief credibility note

5. CONCLUSION & NEXT STEPS
Summarize key insights with citations. Provide an evidence-based action plan tailored to {{expertise_level}} level. Suggest specific resources for further research.

IMPORTANT REQUIREMENTS:
- Cite every significant claim with numbered references
- Adapt technical depth to {{expertise_level}} level
- Balance theory with practical applications
- Clearly distinguish established knowledge from informed suggestions
- State limitations when research is uncertain`,
    variables: [
      {
        key: 'subject',
        label: 'Subject or Area of Interest',
        type: 'text',
        placeholder: 'e.g., renewable energy, consumer psychology, supply chain management',
        description: 'Your specific field of inquiry',
        required: true
      },
      {
        key: 'expertise_level',
        label: 'Expertise Level',
        type: 'select',
        options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        description: 'Select your knowledge level to calibrate technical depth',
        required: true
      },
      {
        key: 'research_question',
        label: 'Specific Research Question',
        type: 'textarea',
        placeholder: 'e.g., What are the most cost-effective urban infrastructure adaptations for rising sea levels in coastal cities?',
        description: 'The more focused your question, the more valuable the research results',
        required: true
      }
    ],
    tips: [
      'Be specific with your research question to receive more targeted insights',
      'Indicate your expertise level accurately for appropriate technical depth',
      'Use the response as a starting point for deeper investigation',
      'Review provided sources and follow citation trails',
      'Combine findings from multiple research sessions for comprehensive understanding'
    ]
  },
  {
    id: 'claude-mega-prompt',
    name: 'Claude Mega-Prompt Template',
    description: 'Structured XML-based prompt template optimized for Claude AI',
    category: 'General',
    aiModel: 'Claude',
    template: `<role>
Adopt the role of an expert {{role}}. Primary focus: {{primary_focus}}, adaptable to {{industry}}. Designed for {{target_audience}}, adjustable for {{other_audiences}}.
</role>

<goal>
Your primary goal is to assist with {{business_goal}} for {{business_product}}.
</goal>

<key_tasks>
Follow each step to complete the task:

Step 1: {{task_1}}
Step 2: {{task_2}}
Step 3: {{task_3}}
</key_tasks>

<response_structure>
Offer {{detail_level}} guidance for {{task_goal}}.
Use a {{tone_style}} tone.
Adopt a {{ai_persona}} style.
Tailor responses to {{specific_context}}.
</response_structure>

<session_structure>
Approach: {{approach_type}}.
Interaction Format: Progress as {{interaction_format}}.
Align responses with {{task_context}}.
</session_structure>

<examples>
#EXAMPLE 1:
Task: {{example_task_1}}
Input: {{example_input_1}}
Output: {{example_output_1}}

#EXAMPLE 2:
Task: {{example_task_2}}
Input: {{example_input_2}}
Output: {{example_output_2}}
</examples>

<information_about_me>
{{custom_variable_1}}: {{custom_value_1}}
{{custom_variable_2}}: {{custom_value_2}}
{{custom_variable_3}}: {{custom_value_3}}
</information_about_me>

<response_format>
Give your output in: {{output_format}}
</response_format>

<output>
{{output_instructions}}
</output>`,
    variables: [
      {
        key: 'role',
        label: 'Expert Role',
        type: 'text',
        placeholder: 'e.g., Copywriter, Marketer, Data Analyst',
        required: true
      },
      {
        key: 'primary_focus',
        label: 'Primary Focus',
        type: 'text',
        placeholder: 'e.g., SEO Optimization, Brand Messaging',
        required: true
      },
      {
        key: 'industry',
        label: 'Industry/Application',
        type: 'text',
        placeholder: 'e.g., E-commerce, B2B Services',
        required: true
      },
      {
        key: 'target_audience',
        label: 'Target Audience',
        type: 'text',
        placeholder: 'e.g., Small Business Owners, Marketing Professionals',
        required: true
      },
      {
        key: 'business_goal',
        label: 'Business Goal/Objective',
        type: 'textarea',
        placeholder: 'e.g., Increasing Online Visibility, Streamlining Customer Service',
        required: true
      },
      {
        key: 'task_1',
        label: 'Task Step 1',
        type: 'text',
        placeholder: 'e.g., Identify Target Keywords',
        required: true
      },
      {
        key: 'task_2',
        label: 'Task Step 2',
        type: 'text',
        placeholder: 'e.g., Craft Engaging Ad Copy',
        required: true
      },
      {
        key: 'task_3',
        label: 'Task Step 3',
        type: 'text',
        placeholder: 'e.g., Analyze Competitor Strategies',
        required: true
      },
      {
        key: 'tone_style',
        label: 'Tone Style',
        type: 'select',
        options: ['Friendly', 'Casual', 'Academic', 'Professional', 'Provocative'],
        required: true
      },
      {
        key: 'output_format',
        label: 'Output Format',
        type: 'select',
        options: ['Numbered List', 'Bullet Points', 'Narrative Summary', 'Table Format', 'Code Block'],
        required: true
      }
    ],
    tips: [
      'Claude performs better with XML-tagged prompts',
      'Be specific with role definitions and task steps',
      'Include concrete examples for better results',
      'Use structured output formats for clarity'
    ]
  },
  {
    id: 'tweet-generator',
    name: 'Tweet Generator Mega-Prompt',
    description: 'Generate 30 engaging tweet ideas based on questions, misconceptions, and trust-builders',
    category: 'Marketing',
    aiModel: 'ChatGPT, Claude',
    template: `QUESTIONS (10 tweet ideas for {{work_area}})
These address problems {{target_audience}} wants to solve. Valuable, actionable questions demonstrating expertise in {{work_area}}.

1. [Core concept]
   - Why it resonates: [Explanation]
   - Target segment: [Specific audience]
   - Best angle: [Approach]

2. [Core concept]
   - Why it resonates: [Explanation]
   - Target segment: [Specific audience]
   - Best angle: [Approach]

[Continue through 10]

MISCONCEPTIONS (10 tweet ideas)
These challenge common beliefs in {{work_area}}. Ideas that change how {{target_audience}} thinks.

11. [Core concept]
    - Why it resonates: [Explanation]
    - Target segment: [Specific audience]
    - Best angle: [Approach]

12. [Core concept]
    - Why it resonates: [Explanation]
    - Target segment: [Specific audience]
    - Best angle: [Approach]

[Continue through 20]

TRUST-BUILDERS (10 tweet ideas)
These show shared values, struggles, goals aligned with: {{personal_positioning}}

21. [Core concept]
    - Why it resonates: [Explanation]
    - Target segment: [Specific audience]
    - Best angle: [Approach]

22. [Core concept]
    - Why it resonates: [Explanation]
    - Target segment: [Specific audience]
    - Best angle: [Approach]

[Continue through 30]{{#if product}}

Product Integration: Naturally weave {{product}} into relevant ideas{{/if}}{{#if complexity}}
Complexity: {{complexity}}{{/if}}{{#if creativity}}
Creativity: {{creativity}}{{/if}}

Focus on overlooked and unconventional ideas aligned with the positioning and audience.`,
    variables: [
      {
        key: 'work_area',
        label: 'Work Area',
        type: 'text',
        placeholder: 'e.g., SaaS founders, content creators, designers',
        required: true
      },
      {
        key: 'personal_positioning',
        label: 'Personal Positioning',
        type: 'textarea',
        placeholder: 'Describe yourself and what you stand for on Twitter',
        required: true
      },
      {
        key: 'target_audience',
        label: 'Target Audience',
        type: 'textarea',
        placeholder: 'Describe your ideal Twitter followers',
        required: true
      },
      {
        key: 'product',
        label: 'Product to Promote (Optional)',
        type: 'text',
        placeholder: 'Your product or newsletter',
        required: false
      },
      {
        key: 'complexity',
        label: 'Complexity Level',
        type: 'select',
        options: ['Beginner-friendly', 'Intermediate', 'Advanced'],
        required: false
      },
      {
        key: 'creativity',
        label: 'Creativity Level',
        type: 'select',
        options: ['Moderate', 'High', 'Very High'],
        required: false
      }
    ],
    tips: [
      'Be specific about your positioning and audience',
      'Focus on unconventional and eye-catching ideas',
      'Use the ideas as inspiration, not final tweets',
      'Test different frameworks to find what resonates'
    ]
  },
  {
    id: 'business-strategy',
    name: 'Business Strategy Analyzer',
    description: 'Analyze business ideas with realistic feedback and validation',
    category: 'Business',
    aiModel: 'ChatGPT, Claude',
    template: `1. BUSINESS IDEA OVERVIEW
{{business_idea}}

Core concept and value proposition: [2-3 sentence summary]

2. POTENTIAL MARKETS

Market 1: [Name]
- Demographics: [Specific details]
- Size estimate: [Numbers]
- Accessibility: [How reachable]

Market 2: [Name]
- Demographics: [Specific details]
- Size estimate: [Numbers]
- Accessibility: [How reachable]

Market 3: [Name]
- Demographics: [Specific details]
- Size estimate: [Numbers]
- Accessibility: [How reachable]

[Continue for 4-5 markets]

3. PERSONA VALIDATIONS

Persona 1: [Name/Type]
- Age, occupation, income level: [Details]
- Specific pain points this addresses: [List]
- Would they pay? [Brutally honest yes/no with reasoning]

Persona 2: [Name/Type]
- Age, occupation, income level: [Details]
- Specific pain points this addresses: [List]
- Would they pay? [Brutally honest yes/no with reasoning]

Persona 3: [Name/Type]
- Age, occupation, income level: [Details]
- Specific pain points this addresses: [List]
- Would they pay? [Brutally honest yes/no with reasoning]

4. MARKET RISKS

1. Competition: [Specific analysis]
2. Market timing: [Concerns]
3. Execution challenges: [Realistic obstacles]
4. Financial risks: [Money concerns]
5. Regulatory/legal: [Compliance issues]
6. [Additional risk]
7. [Additional risk]

5. ALTERNATIVE BUSINESS MODELS

Alternative 1: [Approach]
- Why this might work better: [Reasoning]
- Key changes required: [List]

Alternative 2: [Approach]
- Why this might work better: [Reasoning]
- Key changes required: [List]

Alternative 3: [Approach]
- Why this might work better: [Reasoning]
- Key changes required: [List]

6. FINAL VALIDATION

Viability: [Yes / No / Maybe with specific conditions]

Required changes for success:
1. [Change]
2. [Change]
3. [Change]

Recommendation: [Pursue / Pivot / Abandon]

Reasoning: [Brutally honest assessment, no sugar-coating]

If pursuing, next steps:
1. [Action] - Timeline: [Specific]
2. [Action] - Timeline: [Specific]
3. [Action] - Timeline: [Specific]
4. [Action] - Timeline: [Specific]
5. [Action] - Timeline: [Specific]`,
    variables: [
      {
        key: 'business_idea',
        label: 'Business Idea',
        type: 'textarea',
        placeholder: 'Describe your business idea in detail...',
        description: 'Include the problem you\'re solving, target market, and business model',
        required: true
      }
    ],
    tips: [
      'Be prepared for honest, critical feedback',
      'Include as much detail as possible about your idea',
      'Consider the persona validations carefully',
      'Use the alternative models as inspiration for pivots'
    ]
  },
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign Planner',
    description: 'Create comprehensive marketing campaign strategies',
    category: 'Marketing',
    aiModel: 'ChatGPT, Gemini',
    template: `Create a comprehensive marketing campaign plan for:

Product/Service: {{product_service}}
Industry: {{industry}}
Marketing Channels: {{marketing_channels}}
Target Audience: {{target_audience}}
Campaign Goals: {{campaign_goals}}
Budget: {{budget}}
Timeline: {{timeline}}

1. CAMPAIGN STRATEGY
- Core messaging and positioning statement
- Unique value proposition (one clear sentence)
- 3-5 key differentiators from competitors
- Brand voice and tone guidelines

2. CHANNEL STRATEGY
For each channel in {{marketing_channels}}:
- Why this channel fits the audience and goals
- Specific tactics and content types
- Budget allocation (% of {{budget}})
- Expected ROI and timeline to results

3. CONTENT CALENDAR ({{timeline}})
Week-by-week breakdown:
- Content themes for each week
- Specific content pieces per channel
- Publishing schedule and frequency
- Content formats (video, blog, social, email, etc.)

4. METRICS & KPIs
Primary metrics:
- [Tied directly to {{campaign_goals}}]

Secondary metrics:
- Engagement, reach, conversion rates

Benchmarks and targets:
- Specific numbers for each metric
- Timeline for achieving targets

5. RISK MITIGATION
Identify 3-5 potential challenges:
- What could go wrong
- How to prevent it
- Contingency plan if it happens

6. EXECUTION ROADMAP

Phase 1: Pre-launch (Weeks 1-2)
- Specific tasks with owners
- Assets to create
- Setup requirements

Phase 2: Launch (Weeks 3-6)
- Daily/weekly activities
- Monitoring requirements
- Quick-win tactics

Phase 3: Optimization (Weeks 7+)
- What to measure
- How to optimize
- Scaling strategies

Provide specific, actionable recommendations ready for immediate implementation.`,
    variables: [
      {
        key: 'industry',
        label: 'Industry',
        type: 'text',
        placeholder: 'e.g., SaaS, E-commerce, Healthcare',
        required: true
      },
      {
        key: 'marketing_channels',
        label: 'Preferred Marketing Channels',
        type: 'text',
        placeholder: 'e.g., Social Media, Email, Content Marketing, Paid Ads',
        required: true
      },
      {
        key: 'product_service',
        label: 'Product/Service',
        type: 'textarea',
        placeholder: 'Describe what you\'re marketing',
        required: true
      },
      {
        key: 'target_audience',
        label: 'Target Audience',
        type: 'textarea',
        placeholder: 'Describe your ideal customers',
        required: true
      },
      {
        key: 'campaign_goals',
        label: 'Campaign Goals',
        type: 'textarea',
        placeholder: 'e.g., Generate 1000 leads, Increase brand awareness by 50%',
        required: true
      },
      {
        key: 'budget',
        label: 'Budget',
        type: 'text',
        placeholder: 'e.g., $10,000/month',
        required: true
      },
      {
        key: 'timeline',
        label: 'Timeline',
        type: 'text',
        placeholder: 'e.g., 3 months, Q1 2024',
        required: true
      }
    ],
    tips: [
      'Be specific about your goals and metrics',
      'Include realistic budget constraints',
      'Consider your team\'s capacity for execution',
      'Start with one or two channels and expand'
    ]
  },
  {
    id: 'sales-email',
    name: 'Sales Email Generator',
    description: 'Create personalized, high-converting sales emails',
    category: 'Sales',
    aiModel: 'ChatGPT, Claude',
    template: `Write a high-converting sales email sequence for:

Product/Service: {{product_service}}
Industry: {{industry}}
Target Prospect: {{target_prospect}}
Their Pain Point: {{pain_point}}
Your Unique Solution: {{unique_solution}}
Desired Action: {{desired_action}}
Tone: {{tone}}

1. SUBJECT LINES
Provide 3 options (under 50 characters each):
a) [Curiosity-focused]
b) [Value-focused]
c) [Personalization-focused]

2. INITIAL EMAIL (under 150 words)

Subject: [Use one from above]

Hi [First Name],

[Opening: Personalized hook showing you researched them - reference their company, recent achievement, or specific challenge]

[Problem: Acknowledge {{pain_point}} in their own words]

[Solution: Present {{unique_solution}} as the answer - focus on their benefit, not your features]

[Proof: One specific result or social proof - use numbers]

[CTA: Single, clear action for {{desired_action}}]

[Sign off]

3. FOLLOW-UP #1 (3 days later, under 100 words)

Subject: [New subject line]

[Brief reminder of value]
[Different angle on the problem]
[Soft CTA]

4. FOLLOW-UP #2 (7 days later, under 100 words)

Subject: [New subject line]

[Case study or specific example]
[Address potential objection]
[Clear CTA]

5. FOLLOW-UP #3 (14 days later, under 100 words)

Subject: [New subject line]

[Break-up email or final value offer]
[Last chance framing]
[Final CTA]

Write all emails in {{tone}} tone. Focus on the prospect's needs, use specific numbers, and keep it conversational.`,
    variables: [
      {
        key: 'industry',
        label: 'Industry',
        type: 'text',
        placeholder: 'e.g., B2B SaaS, Consulting, E-commerce',
        required: true
      },
      {
        key: 'product_service',
        label: 'Product/Service',
        type: 'textarea',
        placeholder: 'What are you selling?',
        required: true
      },
      {
        key: 'target_prospect',
        label: 'Target Prospect',
        type: 'text',
        placeholder: 'e.g., VP of Marketing at mid-size tech companies',
        required: true
      },
      {
        key: 'pain_point',
        label: 'Their Pain Point',
        type: 'textarea',
        placeholder: 'What problem are they facing?',
        required: true
      },
      {
        key: 'unique_solution',
        label: 'Your Unique Solution',
        type: 'textarea',
        placeholder: 'How do you solve their problem uniquely?',
        required: true
      },
      {
        key: 'desired_action',
        label: 'Desired Action',
        type: 'text',
        placeholder: 'e.g., Book a 15-min demo, Download whitepaper',
        required: true
      },
      {
        key: 'tone',
        label: 'Email Tone',
        type: 'select',
        options: ['Professional', 'Casual', 'Friendly', 'Direct', 'Consultative'],
        required: true
      }
    ],
    tips: [
      'Personalize the opening with specific research',
      'Focus on their problem, not your product',
      'Keep it short and scannable',
      'Test different subject lines',
      'Follow up persistently but respectfully'
    ]
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy Builder',
    description: 'Develop comprehensive content marketing strategies',
    category: 'Marketing',
    aiModel: 'ChatGPT, Gemini',
    template: `Develop a 90-day content marketing strategy for:

Company/Brand: {{company}}
Industry: {{industry}}
Preferred Content Types: {{content_types}}
Target Audience: {{target_audience}}
Business Goals: {{business_goals}}
{{#if current_efforts}}Current Content Efforts: {{current_efforts}}
{{/if}}Available Resources: {{resources}}

1. CONTENT PILLARS (3-5 core themes)

Pillar 1: [Name]
- How it aligns with {{business_goals}}
- Value it provides to {{target_audience}}
- Content angle and perspective

Pillar 2: [Name]
[Same structure]

Pillar 3: [Name]
[Same structure]

[Continue for 4-5 pillars]

2. CONTENT MIX

For {{content_types}}:
- Recommended split (% of total content)
- Distribution channels for each type
- Publishing frequency (realistic for {{resources}})
- Production requirements and timeline

3. TOPIC IDEATION (30 specific ideas)

Organize by pillar and content type:

Pillar 1:
- [Content Type]: [Specific topic + target keyword]
- [Content Type]: [Specific topic + target keyword]
[10 ideas total across pillars]

[Continue for all 30 ideas]

4. 90-DAY CONTENT CALENDAR

Week 1-2: [Theme]
- [Specific content pieces with format and channel]

Week 3-4: [Theme]
- [Specific content pieces with format and channel]

[Continue through Week 12]

Special campaigns:
- [Any seasonal or event-based content]

5. DISTRIBUTION STRATEGY

Primary Channels:
- [Channel]: Optimization tips, posting frequency, best practices

Secondary Channels:
- [Channel]: Optimization tips, posting frequency, best practices

Cross-Promotion:
- How to repurpose content across channels
- Amplification tactics

6. MEASUREMENT FRAMEWORK

For each content type:
- Primary KPI
- Secondary metrics
- Success benchmarks (specific numbers)
- Reporting: [Weekly/Monthly] dashboard

7. RESOURCE ALLOCATION

Based on {{resources}}:

Team Structure:
- [Role]: Responsibilities and time commitment

Tools Needed:
- [Tool]: Purpose and estimated cost

Budget Breakdown:
- Content creation: $X
- Tools/software: $X
- Promotion: $X
- Total: $X

Provide realistic recommendations that can be executed with the stated resources.`,
    variables: [
      {
        key: 'industry',
        label: 'Industry',
        type: 'text',
        placeholder: 'e.g., B2B SaaS, Healthcare, Finance',
        required: true
      },
      {
        key: 'content_types',
        label: 'Preferred Content Types',
        type: 'text',
        placeholder: 'e.g., Blog posts, Videos, Podcasts, Infographics',
        required: true
      },
      {
        key: 'company',
        label: 'Company/Brand',
        type: 'text',
        placeholder: 'Your company name and brief description',
        required: true
      },
      {
        key: 'target_audience',
        label: 'Target Audience',
        type: 'textarea',
        placeholder: 'Describe your ideal content consumers',
        required: true
      },
      {
        key: 'business_goals',
        label: 'Business Goals',
        type: 'textarea',
        placeholder: 'e.g., Generate leads, Build brand awareness, Establish thought leadership',
        required: true
      },
      {
        key: 'current_efforts',
        label: 'Current Content Efforts',
        type: 'textarea',
        placeholder: 'What content are you currently creating?',
        required: false
      },
      {
        key: 'resources',
        label: 'Available Resources',
        type: 'textarea',
        placeholder: 'Team size, budget, tools, time commitment',
        required: true
      }
    ],
    tips: [
      'Focus on quality over quantity',
      'Align content with customer journey stages',
      'Repurpose content across multiple formats',
      'Build a sustainable publishing cadence',
      'Measure and optimize based on data'
    ]
  },
  {
    id: 'ai-agent-system',
    name: 'AI Agent System Prompt Generator',
    description: 'Create sophisticated system prompts for AI agents',
    category: 'AI Development',
    aiModel: 'ChatGPT, Claude',
    template: `# ROLE DEFINITION
You are {{agent_purpose}} specializing in {{domain}}. Your expertise serves {{target_users}}.

Your capabilities:
{{primary_functions}}

Your limitations:
- Only provide advice within {{domain}} expertise
- Acknowledge when questions fall outside your knowledge
- Never make guarantees about outcomes

# CORE CAPABILITIES

Primary Functions:
[Break down {{primary_functions}} into specific tasks]
1. [Function 1]
   - Approach: [Methodology]
   - Decision criteria: [How you evaluate]
   - Expected outcomes: [What users get]

2. [Function 2]
   - Approach: [Methodology]
   - Decision criteria: [How you evaluate]
   - Expected outcomes: [What users get]

[Continue for all functions]

Problem-Solving Approach:
- Step 1: Understand the user's context and constraints
- Step 2: Identify core issues and priorities
- Step 3: Propose solutions with trade-offs
- Step 4: Provide actionable next steps
- When uncertain: Ask clarifying questions before proceeding

# INTERACTION GUIDELINES

Communication Style: {{interaction_style}}
- Tone: [Match {{interaction_style}} - professional/friendly/technical]
- Language: Appropriate for {{target_users}}
- Formality: [Adjust based on {{interaction_style}}]

Response Structure:
- Use headers for complex topics
- Use bullet points for lists and options
- Use numbered lists for sequential steps
- Keep paragraphs concise (3-4 sentences max)

User Engagement:
- Ask clarifying questions when requirements are vague
- Confirm understanding before providing detailed solutions
- Offer follow-up options at the end of responses
- Reference previous context when continuing conversations

# KNOWLEDGE BASE

Domain Expertise ({{domain}}):
- [Core knowledge area 1]
- [Core knowledge area 2]
- [Core knowledge area 3]
- Industry frameworks and methodologies
- Current best practices and standards
- Common terminology and concepts

Best Practices:
- Follow {{domain}} industry standards
- Prioritize user safety and ethical considerations
- Recommend proven approaches over experimental ones
- Cite sources when making specific claims

# BEHAVIORAL RULES

ALWAYS:
- Verify understanding before providing solutions
- Explain reasoning behind recommendations
- Acknowledge limitations and uncertainties
- Prioritize {{target_users}} needs and context
- Maintain {{interaction_style}} tone consistently

NEVER:
- Provide advice outside {{domain}} expertise
- Make guarantees about outcomes
- Ignore user constraints or context
- Use jargon without explanation for non-expert users
- Proceed with incomplete information

Edge Cases:
- If request is outside {{domain}}: Acknowledge limitation and suggest relevant resources
- If information is insufficient: Ask specific clarifying questions
- If multiple valid approaches exist: Present options with trade-offs
- If user seems confused: Simplify explanation and check understanding

# OUTPUT FORMATTING

Response Structure:
[Opening: Acknowledge the question/request]
[Main Content: Organized with headers and lists]
[Closing: Summary and next steps]

Markdown Usage:
- Headers (##): For main sections
- Bullet points: For lists, options, features
- Numbered lists: For sequential steps, priorities
- Code blocks: For technical examples, commands, code
- Bold: For emphasis on key points
- Tables: For comparisons, feature matrices

Citations:
- Cite specific sources for statistics and claims
- Format: [Source Name, Year] or direct URL
- Required for: Research findings, statistics, specific methodologies

# QUALITY CONTROLS

Accuracy Verification:
- Cross-reference information with {{domain}} best practices
- Express uncertainty when information may be outdated
- Correct mistakes immediately when identified
- Provide sources for verifiable claims

Bias Mitigation:
- Present multiple perspectives when applicable
- Acknowledge personal/cultural biases in recommendations
- Consider diverse user contexts and needs
- Avoid assumptions about user background or resources

Error Handling:
- If input is unclear: "I need clarification on [specific aspect]. Could you provide [specific information]?"
- If outside expertise: "This falls outside my {{domain}} expertise. I recommend consulting [relevant expert/resource]."
- If conflicting information: "There are different approaches here. Let me outline the trade-offs: [comparison]."

---

Optimized for {{ai_model}}. Tailored for {{target_users}} in {{domain}}.`,
    variables: [
      {
        key: 'agent_purpose',
        label: 'Agent Purpose',
        type: 'textarea',
        placeholder: 'What is the primary purpose of this AI agent?',
        required: true
      },
      {
        key: 'primary_functions',
        label: 'Primary Functions',
        type: 'textarea',
        placeholder: 'List the main tasks this agent will perform',
        required: true
      },
      {
        key: 'target_users',
        label: 'Target Users',
        type: 'text',
        placeholder: 'Who will interact with this agent?',
        required: true
      },
      {
        key: 'domain',
        label: 'Domain/Industry',
        type: 'text',
        placeholder: 'e.g., Healthcare, Finance, Education',
        required: true
      },
      {
        key: 'interaction_style',
        label: 'Interaction Style',
        type: 'select',
        options: ['Professional', 'Friendly', 'Technical', 'Educational', 'Conversational'],
        required: true
      },
      {
        key: 'ai_model',
        label: 'Target AI Model',
        type: 'select',
        options: ['ChatGPT', 'Claude', 'Gemini', 'Generic'],
        required: true
      }
    ],
    tips: [
      'Be specific about capabilities and limitations',
      'Include concrete examples of desired behavior',
      'Test the system prompt with edge cases',
      'Iterate based on actual agent performance',
      'Consider safety and ethical guidelines'
    ]
  },
  {
    id: 'image-generation',
    name: 'AI Image Prompt Generator',
    description: 'Create detailed prompts for AI image generation (DALL-E, Midjourney, Stable Diffusion)',
    category: 'Creative',
    aiModel: 'ChatGPT, Midjourney',
    template: `{{subject}}, {{style}}, {{mood}} atmosphere{{#if color_palette}}, {{color_palette}} color palette{{/if}}{{#if lighting}}, {{lighting}}{{/if}}{{#if composition}}, {{composition}}{{/if}}, highly detailed, professional {{image_style}}{{#if additional_details}}, {{additional_details}}{{/if}}, masterpiece, best quality, 8k uhd, sharp focus

Negative Prompt: low quality, blurry, distorted, deformed, ugly, bad anatomy, watermark, text, signature, amateur, low resolution, artifacts`,
    variables: [
      {
        key: 'image_style',
        label: 'Image Style Category',
        type: 'select',
        options: ['Photography', 'Digital Art', 'Illustration', '3D Render', 'Painting', 'Concept Art'],
        required: true
      },
      {
        key: 'subject',
        label: 'Main Subject',
        type: 'textarea',
        placeholder: 'What should be in the image?',
        required: true
      },
      {
        key: 'style',
        label: 'Artistic Style',
        type: 'text',
        placeholder: 'e.g., Photorealistic, Anime, Watercolor, Cyberpunk',
        required: true
      },
      {
        key: 'mood',
        label: 'Mood/Atmosphere',
        type: 'text',
        placeholder: 'e.g., Dramatic, Peaceful, Energetic, Mysterious',
        required: true
      },
      {
        key: 'color_palette',
        label: 'Color Palette',
        type: 'text',
        placeholder: 'e.g., Warm tones, Monochrome, Vibrant, Pastel',
        required: false
      },
      {
        key: 'composition',
        label: 'Composition',
        type: 'text',
        placeholder: 'e.g., Close-up, Wide angle, Rule of thirds',
        required: false
      },
      {
        key: 'lighting',
        label: 'Lighting',
        type: 'text',
        placeholder: 'e.g., Golden hour, Studio lighting, Dramatic shadows',
        required: false
      },
      {
        key: 'additional_details',
        label: 'Additional Details',
        type: 'textarea',
        placeholder: 'Any other specific requirements',
        required: false
      },
      {
        key: 'ai_platform',
        label: 'AI Platform',
        type: 'select',
        options: ['DALL-E 3', 'Midjourney', 'Stable Diffusion', 'Leonardo AI'],
        required: true
      }
    ],
    tips: [
      'Be specific about style and technical details',
      'Use artistic and photographic terminology',
      'Include negative prompts to avoid unwanted elements',
      'Test and iterate on prompts',
      'Study successful prompts in your chosen style'
    ]
  }
];
