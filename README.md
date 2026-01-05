# Recipe Finder Ionic App

A mobile application built with Ionic Angular that allows users to search for recipes by ingredients, view detailed recipe information, and save favourites.

**Student Number:** G00439372  
**Module:** Mobile Applications Development  
**Course:** Higher Diploma in Science – Computing (Software Development)

---

## 📱 Features

- **Ingredient-Based Search** - Find recipes by entering one or multiple ingredients
- **Recipe Details** - View full recipe information including ingredients with images and step-by-step instructions
- **Measurement Units** - Toggle between Metric and US measurements in Settings
- **Favourites System** - Save and manage favourite recipes with persistent storage
- **Responsive Design** - Optimized for mobile devices

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Ionic Framework | 7.2.1 | Mobile UI components and native features |
| Angular | 17 | Frontend framework with standalone components |
| TypeScript | 5.2 | Type-safe JavaScript development |
| Ionic Storage | 4.0 | Persistent local data storage |
| Spoonacular API | - | Recipe data and images |
| Ionicons | 7.0 | Icon library |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── home/                    # Main search page
│   │   ├── home.page.ts
│   │   ├── home.page.html
│   │   └── home.page.scss
│   ├── recipe-details/          # Full recipe view
│   │   ├── recipe-details.page.ts
│   │   ├── recipe-details.page.html
│   │   └── recipe-details.page.scss
│   ├── settings/                # Measurement preferences
│   │   ├── settings.page.ts
│   │   ├── settings.page.html
│   │   └── settings.page.scss
│   ├── favourites/              # Saved recipes list
│   │   ├── favourites.page.ts
│   │   ├── favourites.page.html
│   │   └── favourites.page.scss
│   ├── services/                # Business logic
│   │   ├── recipe.service.ts    # Spoonacular API calls
│   │   └── storage.service.ts   # Ionic Storage operations
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.routes.ts            # Navigation routing
├── assets/
├── theme/
├── index.html
├── main.ts
├── GitLink.txt                  # GitHub repository link
└── innovation.pdf               # Documentation of extra features
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Ionic CLI (`npm install -g @ionic/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GavinReddy/G00439372-recipe-finder.git
   cd G00439372
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   ionic serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:8100`

---

## 📖 Usage Guide

### Home Page
1. Enter one or more ingredients in the search field (comma-separated for multiple)
2. Tap **SEARCH** to find matching recipes
3. View recipe cards with images and cooking times
4. Tap **DETAILS** to view full recipe information

### Recipe Details Page
1. View all ingredients with images and measurements
2. Follow step-by-step cooking instructions
3. Tap **ADD TO FAVOURITES** to save the recipe
4. Tap **REMOVE FROM FAVOURITES** to unsave

### Settings Page
1. Tap the ⚙️ icon in the header
2. Select **Metric** or **US** for measurement units
3. Setting is automatically saved and persists

### Favourites Page
1. Tap the ❤️ icon in the header
2. View all saved recipes
3. Tap **DETAILS** to view any saved recipe

---

## 🌟 Innovations

This application includes 13 innovations beyond the basic requirements:

| # | Innovation | Description |
|---|------------|-------------|
| 1 | Toast Notifications | Visual feedback when adding/removing favourites |
| 2 | Recipe Count Display | Shows "Found X recipe(s)" after search |
| 3 | Cooking Time Display | Shows prep time with clock icon on recipe cards |
| 4 | Loading Spinners | Visual feedback during API calls |
| 5 | Error Handling | User-friendly error messages |
| 6 | Empty State Messages | Helpful guidance when favourites list is empty |
| 7 | Dynamic Favourite Button | Button changes appearance based on state |
| 8 | Separated Service Classes | Clean separation of concerns |
| 9 | TypeScript Interfaces | Full type safety for API data |
| 10 | ionViewWillEnter Hook | Ensures data refreshes on page revisit |
| 11 | Responsive Image Styling | Images display correctly on all screen sizes |
| 12 | Instructions Fallback | Handles both structured and raw instruction formats |
| 13 | Duplicate Prevention | Prevents adding same recipe twice to favourites |

See `innovation.pdf` in the `src` folder for detailed documentation.

---

## 🔌 API Reference

This application uses the [Spoonacular Food API](https://spoonacular.com/food-api).

### Endpoints Used

**Search Recipes**
```
GET https://api.spoonacular.com/recipes/complexSearch
Parameters:
  - query: Ingredient(s) to search
  - apiKey: API authentication key
  - addRecipeInformation: true (for cooking time)
```

**Get Recipe Details**
```
GET https://api.spoonacular.com/recipes/{id}/information
Parameters:
  - id: Recipe ID
  - apiKey: API authentication key
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `recipe.service.ts` | Handles all Spoonacular API communication |
| `storage.service.ts` | Manages Ionic Storage for favourites and settings |
| `app.routes.ts` | Defines navigation routes between pages |
| `home.page.ts` | Main search functionality and recipe display |
| `recipe-details.page.ts` | Full recipe view with favourites toggle |
| `settings.page.ts` | Measurement unit preferences |
| `favourites.page.ts` | Saved recipes list management |

---

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

---

## 📦 Building for Production

### Web Build
```bash
ionic build --prod
```

### Android Build
```bash
ionic capacitor build android
```

### iOS Build
```bash
ionic capacitor build ios
```

---

## 📝 Submission Notes

- The `src` folder should be zipped for submission
- Ensure `GitLink.txt` contains the repository URL
- Ensure `innovation.pdf` documents all extra features
- The project must run on the course VM with default software

---

## 🔗 Links

- **GitHub Repository:** https://github.com/GavinReddy/G00439372-recipe-finder
- **Spoonacular API Docs:** https://spoonacular.com/food-api/docs
- **Ionic Framework Docs:** https://ionicframework.com/docs
- **Angular Docs:** https://angular.io/docs

---

## 📄 License

This project is submitted as coursework for the Mobile Applications Development module. All rights reserved.

---

## 👤 Author

**Student Number:** G00439372  
**Module:** Mobile Applications Development  
**Institution:** Atlantic Technological University

---

## 🙏 Acknowledgments

- Spoonacular for providing the recipe API
- Ionic Framework team for the excellent mobile development tools
- Course instructors for guidance and support
