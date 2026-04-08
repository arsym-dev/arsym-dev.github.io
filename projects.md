---
layout: page
title: Projects

carousels:
  - images:
    - thumbnail: https://img.youtube.com/vi/dA0rr8sP3QM/hqdefault.jpg
      main: https://www.youtube.com/watch?v=dA0rr8sP3QM
    - thumbnail: /uploads/carousel/ijwtbs/ijwtbs_1_th.jpg
      main: /uploads/carousel/ijwtbs/ijwtbs_1.jpg
    - thumbnail: /uploads/carousel/ijwtbs/ijwtbs_2_th.jpg
      main: /uploads/carousel/ijwtbs/ijwtbs_2.jpg
    - thumbnail: /uploads/carousel/ijwtbs/ijwtbs_3_th.jpg
      main: /uploads/carousel/ijwtbs/ijwtbs_3.jpg
    - thumbnail: /uploads/carousel/ijwtbs/ijwtbs_4_th.jpg
      main: /uploads/carousel/ijwtbs/ijwtbs_4.jpg
    - thumbnail: /uploads/carousel/ijwtbs/ijwtbs_5_th.jpg
      main: /uploads/carousel/ijwtbs/ijwtbs_5.jpg
    - thumbnail: /uploads/carousel/ijwtbs/minigame_1_th.jpg
      main: /uploads/carousel/ijwtbs/minigame_1.webm
    - thumbnail: /uploads/carousel/ijwtbs/minigame_2_th.jpg
      main: /uploads/carousel/ijwtbs/minigame_2.webm
    - thumbnail: /uploads/carousel/ijwtbs/character_customization_th.jpg
      main: /uploads/carousel/ijwtbs/character_customization.webm

  - images:
    - thumbnail: /uploads/carousel/sekimeiya/search_th.jpg
      main: /uploads/carousel/sekimeiya/search.webm
    - thumbnail: /uploads/carousel/sekimeiya/seki_5_th.jpg
      main: /uploads/carousel/sekimeiya/seki_5.jpg
    - thumbnail: /uploads/carousel/sekimeiya/seki_1_th.jpg
      main: /uploads/carousel/sekimeiya/seki_1.jpg
    - thumbnail: /uploads/carousel/sekimeiya/seki_2_th.jpg
      main: /uploads/carousel/sekimeiya/seki_2.jpg
    - thumbnail: /uploads/carousel/sekimeiya/seki_3_th.jpg
      main: /uploads/carousel/sekimeiya/seki_3.jpg
    - thumbnail: /uploads/carousel/sekimeiya/text_preview_th.jpg
      main: /uploads/carousel/sekimeiya/text_preview.webm

  - images:
    - thumbnail: /uploads/carousel/seance/seance_1_th.jpg
      main: /uploads/carousel/seance/seance_1.jpg
    - thumbnail: /uploads/carousel/seance/seance_2_th.jpg
      main: /uploads/carousel/seance/seance_2.jpg
    - thumbnail: /uploads/carousel/seance/seance_3_th.jpg
      main: /uploads/carousel/seance/seance_3.jpg
    - thumbnail: /uploads/carousel/seance/seance_4_th.jpg
      main: /uploads/carousel/seance/seance_4.jpg
---

<p class="eyebrow">Game development</p>

{% include projects/ijwtbs.md number=0 %}
{% include projects/sekimeiya.md number=1 %}
{% include projects/seance.md number=2 %}

{% include projects/vn1.md %}
{% include projects/vn2.md %}
{% include projects/renpy.md %}
{% include projects/misc.md %}

<section class="cta-panel">
  <h2>Game development & interactive storytelling</h2>
  <p>Beyond the listed projects, I have created 2D puzzle, 3D puzzle, adventure games, RPGs, and deckbuilders. In all cases, I strive to create memorable player experiences.</p>
  <div class="hero-actions">
    <a class="button-link button-link--primary" href="{{ '/' | relative_url }}">Home</a>
    <a class="button-link button-link--primary" href="{{ '/automation/' | relative_url }}">Automation</a>
    {% if site.email and site.email != "your-email@example.com" %}
    <a class="button-link" href="mailto:{{ site.email }}">Contact</a>
    {% endif %}
  </div>
</section>