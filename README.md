# 🛠️ Fohlio FE Test — User Management Panel

This is a technical task implementation for **Fohlio**, focused on creating a **User Management Panel** using modern React and frontend engineering best practices.

## 🚀 Tech Stack

- ⚛️ **React 18** with **TypeScript**
- ⚡ **Vite** for fast development & build
- 📦 **Zustand** for state management
- 🔮 **Apollo Client** with **GraphQL**
- 🧱 **Ant Design** as UI library
- 📊 **AG Grid** for data tables
- 💅 **Styled Components** for custom styling
- 🗓️ **date-fns**, **react-icons**
- 🧪 **Jest**, **Testing Library**, **MSW**
- 📚 **Storybook** for UI documentation

## 🗂️ Project Structure (FSD – Feature Sliced Design)

```
src/
├── app/              # App root: routing, layout, providers
├── entities/         # Core business entities (e.g., User)
├── features/         # Features grouped by business logic
├── shared/           # Shared UI, utils, hooks, types
├── widgets/          # Smart UI blocks using entities/features
├── pages/            # Routed pages
├── process/          # App-level processes (e.g., init)
├── styles/           # Global styles, themes
```

This structure follows **Feature-Sliced Design (FSD)** to ensure scalability and maintainability.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/umairazmat/FohliFEProject.git
cd FohliFEProject

# Install dependencies
npm install
```

## 🔨 Available Scripts

```bash
# Start the dev server
npm run dev

# Build for production
npm run build

# Run unit tests
npm run test

# Start Storybook
npm run storybook
```

## 🧪 Testing & QA

- ✅ Unit Testing with **Jest** and **React Testing Library**
- 🧪 API Mocking with **MSW**
- 🔠 Full **TypeScript** support
- 👱‍♂️ Component snapshots in **Storybook**

## 📁 Installed Packages

```bash
npm install antd @apollo/client graphql zustand ag-grid-react ag-grid-community react-router-dom
npm install styled-components @types/styled-components
npm install date-fns react-icons
npm install msw --save-dev
npm install jest @testing-library/react @testing-library/jest-dom --save-dev
npm install storybook --save-dev
```

## 📤 Git Branch Strategy

- `main` – Production-ready
- `dev` – Development integration
- `feature/*` – Task-specific feature branches

## 📄 Deliverables

- [x] Fully functional User Management Panel UI
- [x] Feature-Sliced Design architecture
- [x] Zustand for scoped and typed state
- [x] Ant Design modals, forms, notifications
- [x] AG Grid with sorting, filtering, pagination
- [x] GraphQL queries/mutations via Apollo Client
- [x] Fully typed components with Storybook
- [x] Mocked API with MSW for unit testing

## 🔗 Task Repository

GitHub: [https://github.com/umairazmat/FohliFEProject](https://github.com/umairazmat/FohliFEProject)

## 🌟 Learning Outcomes

- ✅ Architecting apps with **Feature-Sliced Design**
- 🔀 Integration of **GraphQL** with Apollo
- 🗂️ Reusable and typed **Zustand** stores
- 🧪 Setup of **unit testing** with mocked APIs
- 📚 Documenting UI with **Storybook**
- 👱‍♂️ Combining Ant Design with AG Grid for rich UX

## 📬 Author

**Umair Azmat**  
🌐 [LinkedIn](https://www.linkedin.com/in/umairazmat)  
📧 umairazmatdev@gmail.com  
🔗 [GitHub](https://github.com/umairazmat)

---

_This repository is part of the evaluation process for the frontend role at Fohlio._  
_Built with precision, performance, and architectural clarity in mind._
