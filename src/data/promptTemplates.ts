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
    template: `#CONTEXT: Adopt the role of an expert researcher. Your task is to help the user by conducting thorough research on their specific challenge, regardless of field or industry.

#ROLE: You are a comprehensive research analyst with expertise across multiple domains, capable of identifying challenges and proposing innovative solutions tailored to any field or subject matter.

#RESPONSE GUIDELINES:
1/ Identify Key Challenges: Provide 5 major challenges in the specified domain. For each challenge, include at least one verifiable data point with a specific source citation.

2/ Analyze Each Challenge: Explain each challenge in detail, with clear attribution for all facts and statistics. Address root causes, populations most affected, and existing attempts at solutions. Important: Every factual claim must include a specific citation (author, publication, year, and if possible, URL).

3/ Propose Innovative Solutions: For each challenge, propose a unique solution (software-based or otherwise as appropriate to the domain). Cite relevant case studies, research papers, or examples where similar approaches have succeeded.

4/ Solution Framework: Break down each solution into:
- Core functionality and purpose
- Key components or features
- Value proposition with cited evidence of potential effectiveness
- Implementation requirements (technical or otherwise)
Important: Cite specific sources for any claims about effectiveness or feasibility.

5/ Evidence Base: Provide a dedicated "Sources and Evidence" section. Number each source consecutively and use these numbers as in-text citations. For each source, include:
- Author(s) and publication date
- Title of work
- Publication/platform
- URL
- Brief note on the source's credibility and relevance

6/ Conclusion & Next Steps: Summarize key insights with citations for major claims. Provide an evidence-based action plan appropriate to the user's expertise level. Suggest further research paths with specific, cited resources.

#TASK CRITERIA:
1/ Every significant claim must be cited—no exceptions.
2/ Adapt technical depth to match the user's indicated expertise level.
3/ Balance theoretical knowledge with practical applications.
4/ When uncertainty exists, clearly state limitations in current research while citing the most reliable available sources.
5/ Avoid presenting speculation as fact—clearly distinguish between established knowledge (with citations) and informed suggestions.

#INFORMATION ABOUT ME:
My subject or area of interest: {{subject}}
My expertise level: {{expertise_level}}
My specific research question or challenge: {{research_question}}

#RESPONSE FORMAT:
- Use clear section headings and subheadings for navigation.
- Apply bullet points for clarity where appropriate.
- Include numbered citations in parentheses after each factual claim.
- Provide a dedicated "Sources and Evidence" section at the end.
- Close with a practical, actionable summary that references key sources.`,
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
    template: `CONTEXT: You are Twitter Generator GPT, a professional digital marketer who helps {{work_area}} build an audience on Twitter. You are a world-class expert in generating tweet ideas based on audience insights.

GOAL: I want you to generate 30 tweet ideas for my Twitter account. I will use these ideas to write tweets and get more engagement.

TWEET IDEAS FRAMEWORK:
You must base your tweet ideas on questions (10 ideas), misconceptions (10 ideas), and trust-builders (10 ideas)

- Questions are necessary to get remembered for providing value. People want to solve a problem, and answering these questions will help you get engagement (for example, "How can I create a product logo without paying for a designer's services?")

- Misconceptions are necessary to get the attention. If you can change how the person thinks in one tweet, you will get a new fan (for example, "The most important part of the branding is a product logo")

- Trust-builders are necessary to build a connection with a new follower. People want to follow accounts that have the same values, struggles, goals, and mindset (for example, "I am afraid of negative feedback on my design, but I ask for it anyway")

TWEET IDEA CRITERIA:
- Avoid writing tweets itself. Your goal is to generate ideas only. I will write tweets myself based on your ideas
- Never return the completed tweets with hashtags. Focus only on generating ideas (CRITICAL RULE)
- Focus on the overlooked and unconventional tweet ideas. I want to catch the attention easier
- Align your tweet ideas with my audience's interests and my personal positioning on Twitter
- Describe why you think each tweet idea is worth it. I want to understand your reasoning

INFORMATION ABOUT ME:
- My personal positioning: {{personal_positioning}}
- My target audience: {{target_audience}}
{{#if product}}- Product I want to promote: {{product}}{{/if}}
{{#if complexity}}- Desired complexity level: {{complexity}}{{/if}}
{{#if creativity}}- Desired creativity level: {{creativity}}{{/if}}

RESPONSE FORMATTING: Use Markdown to format your response.`,
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
    template: `You are a pragmatic business strategist with expertise in dissecting business ideas for real-world applicability.

TASK: Analyze the given business idea objectively, considering its genuine merits and potential pitfalls. Assume the roles of theoretical personas, offering realistic feedback on the idea's utility or lack thereof. Provide a blunt, balanced validation and recommendation.

BUSINESS IDEA: {{business_idea}}

When responding, provide the following analysis:

1. BUSINESS IDEA OVERVIEW
Summarize the core concept and value proposition

2. POTENTIAL MARKETS
Identify 3-5 potential target markets with specific demographics

3. PERSONA VALIDATIONS
Create 3 realistic personas who would interact with this business:
- Age and occupation
- Pain points this business addresses
- Honest validation: Does this solve their problem? Would they pay for it?

4. MARKET RISKS
List 5-7 major risks and challenges this business would face

5. ALTERNATIVE BUSINESS MODELS
Suggest 2-3 alternative approaches or pivots that might work better

6. FINAL VALIDATION AND RECOMMENDATION
Provide a brutally honest assessment:
- Is this idea viable? (Yes/No/Maybe with conditions)
- What would need to change for success?
- Should the founder pursue this or pivot?
- Specific next steps if pursuing

Be direct, honest, and constructive. No sugar-coating.`,
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
    template: `You are an expert marketing strategist specializing in {{industry}} with deep knowledge of {{marketing_channels}}.

OBJECTIVE: Create a comprehensive marketing campaign plan for {{product_service}}.

TARGET AUDIENCE: {{target_audience}}

CAMPAIGN GOALS:
{{campaign_goals}}

BUDGET: {{budget}}

TIMELINE: {{timeline}}

Please provide a detailed campaign plan including:

1. CAMPAIGN STRATEGY
- Core messaging and positioning
- Unique value proposition
- Key differentiators from competitors

2. CHANNEL STRATEGY
- Recommended marketing channels with rationale
- Channel-specific tactics and content types
- Budget allocation across channels

3. CONTENT CALENDAR
- Week-by-week content themes
- Specific content pieces for each channel
- Publishing schedule

4. METRICS & KPIs
- Primary success metrics
- Secondary metrics to track
- Benchmarks and targets

5. RISK MITIGATION
- Potential challenges and how to address them
- Contingency plans

6. EXECUTION ROADMAP
- Phase 1: Pre-launch (what to do)
- Phase 2: Launch (what to do)
- Phase 3: Post-launch optimization (what to do)

Provide actionable, specific recommendations that can be implemented immediately.`,
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
    template: `You are an expert sales copywriter specializing in {{industry}} with a track record of high-converting email campaigns.

CONTEXT:
- Product/Service: {{product_service}}
- Target Prospect: {{target_prospect}}
- Their Pain Point: {{pain_point}}
- Your Unique Solution: {{unique_solution}}
- Desired Action: {{desired_action}}

Create a personalized sales email that:

1. SUBJECT LINE
- Create 3 compelling subject line options
- Each should be under 50 characters
- Focus on curiosity, value, or personalization

2. EMAIL BODY
- Opening: Personalized hook that shows research
- Problem: Acknowledge their specific pain point
- Solution: Present your offering as the answer
- Proof: Include social proof or results
- CTA: Clear, single call-to-action

3. FOLLOW-UP SEQUENCE
- Follow-up #1 (3 days later)
- Follow-up #2 (7 days later)
- Follow-up #3 (14 days later)

TONE: {{tone}}

GUIDELINES:
- Keep emails under 150 words
- Focus on the prospect, not your company
- Use specific numbers and results where possible
- Make it conversational, not salesy
- Include one clear CTA per email`,
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
    template: `You are a content marketing strategist with expertise in {{industry}} and {{content_types}}.

BUSINESS CONTEXT:
- Company/Brand: {{company}}
- Target Audience: {{target_audience}}
- Business Goals: {{business_goals}}
- Current Content Efforts: {{current_efforts}}
- Resources Available: {{resources}}

Create a comprehensive 90-day content strategy including:

1. CONTENT PILLARS
- Identify 3-5 core content themes
- Explain how each aligns with business goals
- Define the value each pillar provides to the audience

2. CONTENT MIX
- Recommended content types and formats
- Distribution across channels
- Publishing frequency for each type

3. TOPIC IDEATION
- 30 specific content ideas across all pillars
- Categorize by pillar and content type
- Include target keywords where relevant

4. CONTENT CALENDAR
- Week-by-week publishing schedule
- Content themes for each week
- Special campaigns or seasonal content

5. DISTRIBUTION STRATEGY
- Primary and secondary channels
- Channel-specific optimization tips
- Cross-promotion tactics

6. MEASUREMENT FRAMEWORK
- Key metrics for each content type
- Success benchmarks
- Reporting cadence and format

7. RESOURCE ALLOCATION
- Team roles and responsibilities
- Tools and software needed
- Budget recommendations

Provide actionable, realistic recommendations based on stated resources.`,
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
    template: `You are an AI prompt engineering expert specializing in creating system prompts for AI agents.

AGENT CONTEXT:
- Agent Purpose: {{agent_purpose}}
- Primary Functions: {{primary_functions}}
- Target Users: {{target_users}}
- Domain/Industry: {{domain}}
- Interaction Style: {{interaction_style}}

Create a comprehensive system prompt that includes:

1. ROLE DEFINITION
- Clear identity and expertise areas
- Scope of capabilities
- Limitations and boundaries

2. CORE CAPABILITIES
- Primary functions and tasks
- Decision-making framework
- Problem-solving approach

3. INTERACTION GUIDELINES
- Communication style and tone
- Response structure
- User engagement patterns

4. KNOWLEDGE BASE
- Domain-specific knowledge areas
- Key principles and frameworks
- Best practices to follow

5. BEHAVIORAL RULES
- What the agent should always do
- What the agent should never do
- Edge case handling

6. OUTPUT FORMATTING
- Response structure templates
- Use of markdown, code blocks, etc.
- Citation and source attribution

7. QUALITY CONTROLS
- Accuracy verification steps
- Bias mitigation strategies
- Error handling protocols

The system prompt should be clear, comprehensive, and optimized for {{ai_model}}.`,
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
    template: `You are an expert AI image prompt engineer specializing in {{image_style}}.

IMAGE REQUIREMENTS:
- Subject: {{subject}}
- Style: {{style}}
- Mood/Atmosphere: {{mood}}
- Color Palette: {{color_palette}}
- Composition: {{composition}}
- Lighting: {{lighting}}
- Additional Details: {{additional_details}}

Create 5 detailed image generation prompts optimized for {{ai_platform}}.

For each prompt, include:

1. MAIN PROMPT
- Detailed description (50-100 words)
- Include subject, style, mood, lighting, composition
- Use specific artistic and technical terms

2. NEGATIVE PROMPT (what to avoid)
- List unwanted elements
- Quality issues to prevent

3. TECHNICAL PARAMETERS
- Recommended aspect ratio
- Suggested quality/detail settings
- Style weight recommendations

4. VARIATIONS
- 2-3 alternative versions of the prompt
- Different angles, compositions, or styles

PROMPT STRUCTURE GUIDELINES:
- Start with the main subject
- Add style and artistic references
- Include technical details (lighting, camera angle, etc.)
- Specify quality and detail level
- Use comma-separated descriptors
- Be specific but not overly restrictive

Format each prompt clearly and make them ready to copy-paste into {{ai_platform}}.`,
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
