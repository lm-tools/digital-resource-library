# Search

This describes the current search implementation. Note that this documentation may become out of sync with 
the code base. If you are unsure, validate this with the tests under test/\*\*/\*.spec.js. 

At the time of writing, this documentation was based on the search tests specified in [resourcesModel.spec.js](test/unit/resourcesModel.spec.js).

## Example resource

Find below an example resource

```json
{
  "resourceId": "octo005",
  "title": "Do-it",
  "url": "https://do-it.org",
  "summary": "A website that lets you search for volunteering opportunities in your area.",
  "journalMessage": "Volunteering might help you in your work search. Take a look a Do-it, a website that lets you look for chances to volunteer in your area:\n\n https://do-it.org",
  "category": ["volunteering", "preparing for work"],
  "groups": ["intensive work search"],
  "sector": {}
}
```

## AND vs OR search 

All DRL search is currently a strict *AND* search, i.e. it must find the search term in it’s entirety. 

For example, if I were to search for _'volunteering opportunities in your area'_, the results must contain the 
entire search term. Results that only contain a partial match like _'volunteering'_ and _'opportunities in your area'_ are not returned.

## Fields/properties

### Included search fields

The following fields/properties are currently included in search:

	•	title
	•	url
	•	summary
	•	journalMessage
	•	category
	•	groups

### Excluded search fields

The following Fields/properties are *not* searched: 

	•	sector
	•	resourceId

## Priority

Search results are currently not prioritized. Search results are ordered in the order that they appear in the resources file. 
For example, if you add a new resource to the top of the resources file, and search for a common word such as 'and', it will appear
at the top of the search results, provided that and exists in one of the _included search fields_.
