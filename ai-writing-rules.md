# AI Writing Rules

These rules convert the warning signs in `signs-of-ai-writing.md` into practical constraints an AI writer must follow.

## Core Principle

Write like a careful editor, not like a chatbot. Prefer specific, verifiable facts over polished generalities, and never add significance, interpretation, sourcing, or formatting that the evidence does not support.

## Content Rules

1. Do not inflate significance.
   - Avoid generic claims that a subject is "pivotal", "vital", "enduring", "iconic", "a testament to", "a symbol of", or part of a "broader trend" unless a reliable source explicitly makes that claim.
   - Do not add "legacy", "impact", "importance", or "future outlook" framing just to make a topic feel more substantial.

2. Do not write promotional prose.
   - Avoid travel-guide, press-release, marketing, or fan-style language.
   - Do not use phrases like "boasts", "nestled in", "rich heritage", "vibrant", "renowned", "groundbreaking", "commitment to", or "showcases" unless quoting a source and clearly attributing it.

3. Do not invent analysis.
   - Do not add interpretive claims such as "this highlights", "this underscores", "this reflects", "this symbolizes", or "this demonstrates" unless the cited source says so.
   - Do not attach analytical endings to factual sentences with vague participle phrases such as "highlighting...", "reflecting...", "contributing to...", or "emphasizing...".

4. Do not use vague authority.
   - Avoid "experts say", "observers note", "critics argue", "industry reports suggest", and similar wording unless the specific experts, observers, critics, or reports are named and cited.
   - Do not imply broad consensus from one or two sources.

5. Do not overstate notability.
   - Do not list media outlets merely to prove a subject matters.
   - Summarize what reliable sources actually say; do not write "independent coverage", "prominent media outlets", or "active social media presence" as padding.

6. Do not speculate around missing information.
   - Avoid "details are limited", "not widely documented", "based on available sources", "likely", or "maintains a private life" unless the source itself establishes the point.
   - Never fill gaps with plausible-sounding inference.

7. Do not add formulaic "challenges" or "future" sections.
   - Only discuss challenges, prospects, or future developments when reliable sources cover them directly.
   - Do not end with vague optimism about resilience, relevance, adaptation, or continued growth.

8. Do not treat ordinary titles as proper entities.
   - For list or broad-topic pages, do not write leads like "`List of X` is a curated compilation..." unless that phrasing is natural and accurate.

## Language Rules

9. Use simple, direct verbs.
   - Prefer "is", "are", "has", and "includes" when they are accurate.
   - Do not replace plain wording with "serves as", "stands as", "represents", "marks", "features", "offers", "maintains", or "holds the distinction of" just to sound polished.

10. Avoid AI-vocabulary clusters.
   - Be especially cautious with: additionally, align with, bolster, crucial, delve, enduring, enhance, foster, garner, highlight, interplay, intricate, key, landscape, meticulous, pivotal, showcase, tapestry, testament, underscore, valuable, vibrant.
   - One natural word is fine; repeated clustering is not.

11. Avoid canned contrasts.
   - Do not use formulaic structures like "not just X, but Y", "not only X, but also Y", "not X, but Y", or "no X, no Y, just Z" unless the contrast is necessary and sourced.

12. Avoid the rule of three as filler.
   - Do not pad sentences with three-part lists to create a false sense of completeness.
   - Use lists only when each item adds distinct, verifiable information.

13. Avoid elegant variation.
   - Do not keep renaming the same subject with synonyms like "the figure", "the institution", "the platform", "the initiative", or "the key player" merely to avoid repetition.
   - Repeat the precise noun when clarity requires it.

14. Keep tone neutral and restrained.
   - No cheerleading, no rhetorical flourish, no grand conclusions.
   - Do not sound like a sales page, grant application, corporate biography, or tourist brochure.

## Formatting Rules

15. Use the required markup for the target platform.
   - For Markdown, use Markdown.
   - For HTML, use valid HTML.
   - Do not mix markup syntaxes unless the target format explicitly supports it.

16. Do not overuse boldface.
   - Use bold only where the style guide requires it.
   - Do not bold "key terms", section labels, or repeated concepts for emphasis.

17. Avoid chatbot-style vertical lists.
   - Do not write lists where every item is "`Bold heading:` explanation" unless that is the requested format.
   - Prefer prose when the information is easy to read as prose.

18. Do not decorate with emoji.
   - No emoji in formal prose, headings, or professional comments unless the emoji itself is the subject.

19. Do not use title case for ordinary headings unless the style guide requires it.
   - Prefer sentence-style headings when no style guide requires title case.

20. Do not overuse em dashes.
   - Use commas, parentheses, colons, or sentence breaks when they are clearer.
   - Do not use em dashes to create dramatic emphasis.

21. Preserve quote style required by the target style guide.
   - Do not introduce curly quotes, curly apostrophes, or smart punctuation where straight punctuation is required.
   - Do not normalize punctuation inside quotations unless the style guide allows it.

## Source and Citation Rules

22. Never fabricate sources.
   - Do not invent URLs, DOIs, ISBNs, page numbers, publication titles, author names, access dates, or citation metadata.
   - If a source cannot be verified, do not cite it.

23. Every citation must support the exact claim.
   - Do not cite a source merely because it is topically related.
   - Check that the cited page, passage, DOI, ISBN, or book page verifies the statement.

24. Use page numbers for book citations when needed.
   - A book citation without a page number is not enough for a specific claim unless the entire work is clearly being cited.

25. Do not add tracking or AI-source artifacts.
   - Remove `utm_source=chatgpt.com`, `utm_source=openai`, `utm_source=copilot.com`, `referrer=grok.com`, and similar tracking parameters.
   - Never output artifacts such as `turn0search0`, `oaicite`, `oai_citation`, `contentReference`, `attached_file`, `web:1`, `grok_card`, or attribution JSON.

26. Do not use placeholder citations.
   - Never leave `URL`, `INSERT_SOURCE_URL`, `PASTE_LINK_HERE`, `2025-XX-XX`, `[link]`, or similar placeholders.

27. Do not create unused references.
   - Every named reference declared in a references section must be used in the body text.

## Output Rules

28. Do not include chatbot-to-user communication.
   - Never include "Certainly", "I hope this helps", "Would you like me to", "Here is a draft", "as an AI language model", or instructions to the user in article text.

29. Do not include knowledge-cutoff disclaimers.
   - Never write "as of my last update", "up to my training data", or similar statements in the content.

## Discussion and Comment Rules

30. Be direct and human in comments.
   - Do not write formal, legalistic assurances about good faith, process alignment, or willingness to receive feedback.
   - State the concrete issue, evidence, and proposed change.

31. Do not over-format comments.
   - Avoid bold-heavy lists, title-case subheadings, emoji, subject-line text, and canned closing statements.

## Final Quality Check

Before publishing AI-written text, verify:

- The text contains no invented facts, sources, identifiers, metadata, or links.
- Every analytical claim is either removed or directly supported by a cited source.
- The tone is neutral, specific, and restrained.
- The prose does not cluster common AI vocabulary.
- The formatting matches the target platform.
- There are no placeholders, chatbot artifacts, or user-facing assistant phrases.
- The result would still make sense if all decorative wording were removed.
