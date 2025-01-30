# College Search

<img width="600" alt="image" src="https://github.com/user-attachments/assets/8ce1a9ed-0bb8-4b21-a8ed-4bda7be81f83" />

An easy to use website to search US colleges. Most other college search website are cluttered with ads (or random paid features) and provide a lot of unneccessary information. As someone who just went through the college search and application process, I know what data is useful for evaluating a college.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/2f1b8552-5b93-437b-bb36-c946d826cf0e" />

## Features

-   A clean, uncluttered interface
-   Search universities by name (really fast)
-   Links to reference while researching colleges

## Sources

A majority of data was taken from the [IPEDS database](https://nces.ed.gov/ipeds/), which is an extremeley annoying database to work with. I tried to simplify the parts that I specifically needed in [data_info.md]. Data was exported from MS Access (stupid) to SQLite.

Icons and favicon are from [Lucide Ionicons](https://lucide.dev/icons).

## Tech Stack

-   Frontend/Backend: Next.js
-   Backend/Database: SQLite db and an express server
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
