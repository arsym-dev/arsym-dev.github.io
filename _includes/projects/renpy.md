{% capture role %}
<ul>
  <li>Automated testing system</li>
  <li>Improved documentation and developer-facing clarity</li>
  <li>Ongoing contribution work aimed at reliability and workflow support</li>
</ul>
{% endcapture %}


{% capture links %}
{% include external_links.html
    github="https://github.com/renpy/renpy/"
    link="https://github.com/renpy/renpy/commits?author=arsym-dev"
    link_text="My contributions"
%}
{% endcapture %}

{% include project.html
  title="Ren'Py Engine"
  number=include.number
  role=role
  engine="Ren'Py"
  platforms="PC"
  year="2025-ongoing"
  links=links
%}