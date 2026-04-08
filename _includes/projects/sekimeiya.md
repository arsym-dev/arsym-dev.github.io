{% capture role %}
- **Search and Jump Feature -** *Designed and implemented a system that allows player to search through previously-read text, and jump to any moment in the game*
- **Notes System -** *Created a screen with story summaries, and notes system with rich-text support.*
- **Quality of Life Settings -** *Added numerous improvements to text and sprite presentation*
- **Analytics -** *Collected and aggregated gameplay analytics of all players, which is shown after game completion*
- **Development and debug tools -** *Created tools to speed up sprite selection and placement, as well as tooling for asset creation and content prep*
{% endcapture %}


{% capture links %}
{% include external_links.html
    steam="https://store.steampowered.com/app/1432500/The_Sekimeiya_Spun_Glass/"
    itch ="https://trinitite-team.itch.io/the-sekimeiya-spun-glass"
%}
{% endcapture %}


{% include project.html
  title="The Sekimeiya: Spun Glass"
  number=include.number
  role=role
  genre="Mystery, Sci Fi, Visual Novel"
  engine="Ren'Py"
  platforms="PC"
  year="2021"
  links=links
%}