# leaflet-geosearch-placeholder

A `leaflet-geosearch` provider for the Placeholder coarse geocoder

## Example

```
// Set up map here...

const geo_pr = new PlaceholderProvider('http://localhost:3000');

const search = new GeoSearch.GeoSearchControl({
    provider: geo_pr,
    showMarker: false,
    style: 'bar',
    maxSuggestions: -1,
    notFoundMessage: 'No matches',
});

map.addControl(search);
```

For a complete working example please consult [example/index.html](example/index.html)

## See also

* https://github.com/smeijer/leaflet-geosearch
* https://github.com/pelias/placeholder/