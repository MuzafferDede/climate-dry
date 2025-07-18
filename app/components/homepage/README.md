# How to edit the home page

The starting point is for the below page, which then pulls in components for each section
app\routes\home.tsx

## Thin blue banner text
This has some text and links in it and also scrolls on mobile devices
app\components\homepage\marquee.tsx

## Slider large banners
These are added and amended in the backend on the Sites pages. So you can add and amend for each website and they will be dynamically pulled in to this file
app\components\homepage\banners.tsx

## Two support images
These can be edited in the below file
app\components\homepage\support.tsx

## Solutions section

### React data code
The data is retrieved from the backend via an API call that gets all active solutions.
You can edit this by amending the getSolutions() function on the below page
app\services\solution.server.ts

### Laravel API files
The Laravel backend files and sequence it follows to get the data is;
routes\api.php
- app\Http\Controllers\Api\SolutionsCentreController.php 
    - index() function from the above file
- app\Services\SolutionsCentreService.php
- app\Http\Resources\Api\SolutionsCentreResource.php

### React layout editing
For the react router layout, you can find the file to edit here
app\components\homepage\solutions.tsx

## Featured categories
The data is retrieved from the backend via an API call that filters by is_featured, has_products, limits to 4 categories and 4 products in each and is ordered by creation date.
You can edit this by amending the getFeaturedCategories() function on the below page
app\services\app.server.ts

To edit the layout you can do so by going to the 
app\components\homepage\featured-categories.tsx

Which also utilises the below sub components
app\components\ui\section-header.tsx
app\components\shop\product-card.tsx

## Shop by category
The data is retrieved from the backend via an API call that filters by slug, limits to 4 and is ordered by creation date.
You can edit this by amending the getShopByCategories() function on the below page
app\services\app.server.ts

To edit the layout you can do so by going to the 
app\components\homepage\shop-by-category.tsx

Which also utilises the below sub components
app\components\ui\section-header.tsx
app\components\shop\product-category-card.tsx

## Trusted partners icons

### React data code
These come directly from the brands section of laravel, however the settings requirements are is_featured and also all featured brands need to have an image logo or they will not show
You can edit this by amending the getBrands() function on the below page
app\services\app.server.ts

### Laravel API files
The Laravel backend files and sequence it follows to get the data is;
routes\api.php
- app\Http\Controllers\Api\SiteController.php 
    - brands() function from the above file

### React layout editing
For the react router layout, you can find the file to edit here
app\components\homepage\brands.tsx

## Two info images
These can be edited in the below file
app\components\homepage\info.tsx
