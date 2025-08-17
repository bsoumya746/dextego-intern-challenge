# Dextego Sales Dashboard - Intern Assignment

## Fixed Issues

1. Installed the missing clsx package.
2. Installed the missing lucid-react package.
3. Made the following changes in ./data/calls.json file --
    1.	Added comma after "notes" in call_002.
	2.	Added comma after "id": "call_003".
	3.	Changed "duration" in call_003 to a number, which was a string.
	4.	Removed the extra trailing comma in "tags": ["small-business", "budget-constraint",].
	5.	Added a comma between call_004 and call_005.
4. Made the api/calls structure as below:
	•	GET /api/calls → returns all calls.
	•	POST /api/calls → later, you can extend it to add a new call.
	•	GET /api/calls/[id] → returns a single call by ID.

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm i`
3. Run the development server: `pnpm dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Assignment Instructions

This project has several issues that need to be fixed. Your task is to:

1. Fix all critical bugs that prevent the application from running
2. Ensure all pages load without errors
3. Implement any missing features
4. Add bonus features if time permits

## Expected Features

- Dashboard with sales metrics
- Call listing with search and filter
- Detailed call views
- Responsive design
- Error handling

## Bonus Features (Optional)

- [ ] Theme switcher (dark/light mode)
- [ ] Enhanced search functionality
- [ ] Data visualization/charts
- [ ] Form to add new calls
- [ ] Loading states and animations

## Submission

1. Fix all issues
2. Update this README with what you fixed
3. Commit your changes with clear messages
4. Submit your GitHub repository link

## Tech Stack

- Next.js 15+ with App Router
- TypeScript
- TailwindCSS
- Lucide React (for icons)
