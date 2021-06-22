# Neuze

## Project Description

Neuze is a news app that allows users to search for New York Times articles by keyword.

[Neuze](https://christianjbolus.github.io/neuze/) 

## API and Data Sample

[New York Times API](https://developer.nytimes.com/apis)
```
{
    "status": "OK",
    "copyright": "Copyright (c) 2021 The New York Times Company. All Rights Reserved.",
    "section": "home",
    "last_updated": "2021-05-16T16:22:05-04:00",
    "num_results": 57,
    "results": [
        {
            "section": "world",
            "subsection": "middleeast",
            "title": "When Fighting Erupts Between Israel and Hamas, Charges of War Crimes Follow",
            "abstract": "Civilian deaths on both sides raise urgent questions about which military actions are legal, what war crimes are being committed and who, if anyone, will be held to account.",
            "url": "https://www.nytimes.com/2021/05/16/world/middleeast/israel-gaza-hamas-civilian-casualties.html",
            "uri": "nyt://article/21d7d14c-dc6d-5da0-a25c-0ac6ef0fd138",
            "byline": "By Declan Walsh",
            "item_type": "Article",
            "updated_date": "2021-05-16T15:56:54-04:00",
            "created_date": "2021-05-16T14:24:04-04:00",
            "published_date": "2021-05-16T14:24:04-04:00",
            "material_type_facet": "",
            "kicker": "",
            "des_facet": [
                "Civilian Casualties",
                "War and Armed Conflicts"
            ],
            "org_facet": [
                "Hamas"
            ],
            "per_facet": [],
            "geo_facet": [
                "Israel",
                "Gaza Strip"
            ],
            "multimedia": [
                {
                    "url": "https://static01.nyt.com/images/2021/05/16/world/16israel-civilians1/16israel-civilians1-superJumbo.jpg",
                    "format": "superJumbo",
                    "height": 1365,
                    "width": 2048,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A Palestinian boy in front of the ruins  of his house in Gaza City on Friday after it was destroyed in an Israeli airstrike.",
                    "copyright": "Samar Abu Elouf for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2021/05/16/world/16israel-civilians1/16israel-civilians1-thumbStandard.jpg",
                    "format": "Standard Thumbnail",
                    "height": 75,
                    "width": 75,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A Palestinian boy in front of the ruins  of his house in Gaza City on Friday after it was destroyed in an Israeli airstrike.",
                    "copyright": "Samar Abu Elouf for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2021/05/16/world/16israel-civilians1/16israel-civilians1-thumbLarge.jpg",
                    "format": "thumbLarge",
                    "height": 150,
                    "width": 150,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A Palestinian boy in front of the ruins  of his house in Gaza City on Friday after it was destroyed in an Israeli airstrike.",
                    "copyright": "Samar Abu Elouf for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2021/05/16/world/16israel-civilians1/16israel-civilians1-mediumThreeByTwo210.jpg",
                    "format": "mediumThreeByTwo210",
                    "height": 140,
                    "width": 210,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A Palestinian boy in front of the ruins  of his house in Gaza City on Friday after it was destroyed in an Israeli airstrike.",
                    "copyright": "Samar Abu Elouf for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2021/05/16/world/16israel-civilians1/16israel-civilians1-articleInline.jpg",
                    "format": "Normal",
                    "height": 127,
                    "width": 190,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A Palestinian boy in front of the ruins  of his house in Gaza City on Friday after it was destroyed in an Israeli airstrike.",
                    "copyright": "Samar Abu Elouf for The New York Times"
                }
            ],
            "short_url": "https://nyti.ms/3bvqO6M"
        },
```

## Wireframes

![alt-text](https://res.cloudinary.com/ditt6ekpx/image/upload/v1621254142/GA%20Project%201/iPhone_12_Pro_Max_1_dkkjk3.png "Image of main view of app")

![alt-text](https://res.cloudinary.com/ditt6ekpx/image/upload/v1621254142/GA%20Project%201/iPhone_12_Pro_Max_2_sscbdc.png "Image of modal window")

### MVP/PostMVP

#### MVP 
- Find a reliable news api the returns articles and media
- Render article cards to the page displaying title, image and publish date
- Allow users to search for articles by keyword

#### PostMVP  

- Add modal window to display article abstract, byline and link to full article in addition to title, image and publish date
- Add basic form validation
- Add basic error handling
- Allow users to save articles in local storage

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|May 14-16| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|May 17| Project Approval / Core Application Structure (HTML, CSS, etc.) | Complete
|May 18| Pseudocode / actual code | Complete
|May 19| Initial Clickable Model / MVP  | Complete
|May 20| Advanced CSS / Post MVP | Complete
|May 21| Presentations | Complete

## Priority Matrix

![alt-text](https://res.cloudinary.com/ditt6ekpx/image/upload/v1621254522/GA%20Project%201/priority_matrix_hr_kyprs5.png "Image of priority matrix")

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Basic HTML structure | H | 2 hrs | 1 hrs | 1 hr |
| Establish CSS classes & ids | H | 1.5 hrs | 2 hrs | 1 hr |
| Test API endpoints | H | 2 hrs | 3 hrs | 1 hr |
| App logic for bulding urls | H | 4 hrs | 2 hrs | 1 hr |
| App logic for API request | H | 2 hrs | 5 hrs | 1 hr |
| App logic for parsing data | H | 1 hr | 6 hrs | 1 hr |
| App logic for building HTML components | H | 3 hrs | 7 hrs | 1 hr |
| App logic for appending components | H | 1 hr | 8 hrs | 1 hr |
| App logic for modal | M | 3 hrs | 12 hrs | 4 hrs |
| App logic for animating modal | M | 3 hrs | 18 | 6 hrs |
| App logic for saving articles to local storage | M | 6 hrs | 23 hrs | 5 hrs|
| Style body app body | H | 3 hrs | 25 hrs | 2 hrs |
| Style article cards | H | 3 hrs | 26 hrs | 1 hr |
| Style modal | M | 3 hrs | 28 hrs | 4 hrs |
| Media query app body | H | 3 hrs | 29 hrs | 1 hr |
| Media query article cards | H | 3 hrs | 32 hrs | 4 hrs |
| Total | H | 41.5 hrs| 29 hrs | 32 hrs |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
I decided not to implement a media query for the modal as I thought it looked good at multiple screen sizes.







