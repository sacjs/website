{% assign organizer_links = site.array %}
{% for organizer in site.organizers %}
  {% capture organizer_link %}[{{ organizer.first_name }}](https://twitter.com/{{ organizer.twitter_username }}){% endcapture %}
  {% assign organizer_links = organizer_links | push: organizer_link %}
{% endfor %}
