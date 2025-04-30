# College Search

## Features

-   A clean, uncluttered interface
-   Search universities by name (really fast)
-   Links to reference while researching colleges

## Sources

A majority of data was taken from the [IPEDS database](https://nces.ed.gov/ipeds/), which is an extremeley annoying database to work with. I tried to simplify the parts that I specifically needed in [data_info.md]. Data was exported from MS Access (stupid) to SQLite.

Icons and favicon are from [Lucide Ionicons](https://lucide.dev/icons).

Some logos come from [logo.dev](https://logo.dev/), others are favicons.

## Tech Stack

-   Frontend/Backend: Next.js
-   Backend/Database: SQLite db and an express server found at the [uni-server](https://github.com/underscorelior/uni-server) Github repo
-   Web Hosting: Vercel
-   Database Hosting: [HackClub's Nest](https://guides.hackclub.app/index.php/Main_Page)

## How to run

-   Download the repository
-   In the "uni-search" directory, run: (Make sure to modify the hardcoded URLs in the api routes)
    -   `yarn`/`npm install`
    -   `yarn run dev`/`npm run dev`
-   Then, in the "uni-search-server" directory, run:
    -   `yarn`/`npm install`
    -   `yarn run start`/`npm run start`
