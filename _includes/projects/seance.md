{% capture role %}
- **Puzzles -** *Designed and implemented puzzle logic and visual effects*
- **Screens -** *Created journal and database screens*
- **Save System -** *Built a save/load system that correctly persists game state*
- **Dialogue System -** *Implemented custom system that reads [Ink](https://www.inklestudios.com/ink/) scripts for story progression*
{% endcapture %}


{% capture links %}
{% include external_links.html
    itch ="https://moon-moth-games.itch.io/seance-spectral-noise"
%}
{% endcapture %}


{% include project.html
  title="Séance: Spectral Noise"
  number=include.number
  role=role
  genre="Mystery, Supernatural, Puzzle, Visual Novel"
  engine="Unity"
  platforms="PC"
  year="2021-2022"
  links=links
%}