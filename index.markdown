---
layout: default
title: Arsym Dev
carousels:
  - images:
    - thumbnail: /uploads/carousel/image1_th.jpg
      main: /uploads/carousel/image1.jpg
    - thumbnail: /uploads/carousel/image2_th.jpg
      main: /uploads/carousel/image2.jpg
    - thumbnail: /uploads/carousel/image3.jpg
      main: /uploads/carousel/image3.jpg

duration: 1
---
<section class="hero hero--automation">
  <p class="eyebrow">Automation for game production and creative workflows</p>
  <h1>Build faster with automated workflows</h1>
  <p class="hero-copy">I design practical automation systems and scalable tooling that shorten prototype loops, improve reliability, and add production value without removing the human element.</p>
  <div class="hero-actions">
    <a class="button-link button-link--primary" href="{{ '/automation' | relative_url }}">View automation case studies</a>
    <a class="button-link button-link--primary" href="{{ '/projects' | relative_url }}">Browse game projects</a>
    {% if site.email and site.email != "your-email@example.com" %}
    <a class="button-link" href="mailto:{{ site.email }}">Contact</a>
    {% endif %}
  </div>
</section>

<section class="outcome-strip" aria-label="Selected outcomes">
  <div class="outcome-card">
    <span class="outcome-value">Rapid prototyping</span>
    <span class="outcome-label">Refine ideas and mechanics quickly before formal implementation. Testable prototypes in days rather than weeks.</span>
  </div>
  <div class="outcome-card">
    <span class="outcome-value">More dynamic user experience</span>
    <span class="outcome-label">Add motion and life to test user experience earlier in production. Level design and scene direction become faster to explore and implement.</span>
  </div>
  <div class="outcome-card">
    <span class="outcome-value">Better bug handling</span>
    <span class="outcome-label">Turn bug reports into clearer reproduction steps, narrower search space, and more targeted fixes. Cut resolution time by half on difficult issues. </span>
  </div>
  <div class="outcome-card">
    <span class="outcome-value">Fewer regressions</span>
    <span class="outcome-label">Protect fragile systems and improve release confidence with automated tests. Reduce the chance of old bugs slipping back in.</span>
  </div>
</section>

<h2>Value and experience behind the automation</h2>
<p>Automation is not meant to replace the human element. The goal is to reduce the headache from resolving bugs, spending hours arranging files, and worrying about things that are not part of the creative vision.<p>
<p>This experience is built on shipping real projects where speed, reliability, and maintainability matter every day.</p>
<!-- {% include steam_carousel.html duration="5" number=0 %} -->

<section class="spotlight-grid">
  <article class="spotlight-card">
    <p class="eyebrow">Automation page</p>
    <h3>Case studies built for consulting conversations</h3>
    <p>See the automation-focused work in a client-readable format: problem, workflow, impact, and how it supports production.</p>
    <a class="text-link" href="{{ '/automation' | relative_url }}">Open automation page</a>
  </article>
  <article class="spotlight-card">
    <p class="eyebrow">Projects page</p>
    <h3>Game projects with tooling depth</h3>
    <p>Browse shipped and in-progress work across Ren'Py and Unity, including tools, porting, analytics, and quality-of-life systems.</p>
    <a class="text-link" href="{{ '/projects' | relative_url }}">Open game projects page</a>
  </article>
</section>

<h2>Contact</h2>

{% include external_links.html
  email=site.email
  github="https://github.com/arsym-dev/"
%}