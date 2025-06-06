# Grímur Kokkur

> **Modern and delicious seafood meals**

---

## Table of Contents

- [About](#about)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

---

## About

**Grímur Kokkur** is a family-owned business that offers ready-made seafood dishes with a modern twist. This website is built with **Next.js** and integrates with **DatoCMS** to present the product catalog, company information and a contact form that sends emails via **Nodemailer**.

## Demo

- **Live Site:** [https://your-domain.com](https://your-domain.com)
- **Screenshots:**
  ![Homepage screenshot](path/to/homepage.png)
  _Key features of the site._

## Getting Started

### Prerequisites

- Node.js 16+
- Git

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/aph8/grimurkokkur.git
cd grimurkokkur
npm install
```

## Usage

```bash
# Start development server
yarn dev || npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint the project
npm run lint
```

## Features

- **Dynamic pages** for company information and products fetched from DatoCMS via GraphQL.
- **Product versions** including separate info, nutrition facts and media gallery.
- **Vegan filter** within the product grid.
- **Flexible hero section** with configurable panels.
- **Contact form** that sends mail through Nodemailer.
- **Markdown support** with remark-gfm.
- **Responsive images** using Next/Image with custom ratios.

## Tech Stack

- **Framework:** Next.js 15.3.2
- **Language:** TypeScript, React 19.1.0
- **Styling:** SCSS modules, Sass 1.88.0
- **Data Fetching:** graphql-request, DatoCMS
- **Validation:** Zod 3.25.1
- **Mail:** Nodemailer 7.0.3
- **Markdown:** react-markdown, remark-gfm

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

## Authors

- **Andri Páll Helgason** – [@aph8](https://github.com/aph8) – [aph8@hi.is](mailto:aph8@hi.is)

## Acknowledgements

- [DatoCMS](https://www.datocms.com) – Content management
- [Next.js](https://nextjs.org) – Web framework
- [Zod](https://github.com/colinhacks/zod) – Schema validation
