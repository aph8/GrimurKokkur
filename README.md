# Grímur Kokkur

> **Nútímaleg og ljúffeng matarmenning**

---

## Table of Contents

* [About](#about)
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Configuration](#configuration)
* [API Reference](#api-reference)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

---

## About

Grímur Kokkur er fjölskyldufyrirtæki sem býður upp á nútímalega og ljúffenga matarmenningu með áherslu á tilbúna sjávarrétti. Vefsíðan notar Next.js og DatoCMS til að birta vörulista, upplýsingar um fyrirtækið, og hafa samband form sem sendir tölvupóst.

## Demo

* **Live Site:** [https://your-domain.com](https://your-domain.com)
* **Screenshots:**
  ![Forsíða](path/to/homepage.png)
  *Helstu eiginleikar vefsíðunnar.*

## Installation

### Prerequisites

* Node.js 16+
* Git

```bash
# Klóna geymsluna
git clone https://github.com/yourusername/grimurkokkur.git
cd grimurkokkur

# Setja upp háð (dependencies)
npm install
```

## Usage

```bash
# Í þróunarham\ n npm run dev
# Búa til fyrir framleiðslu
npm run build
# Keyra framleiðsluham
npm start
# Laga villur / lint check
npm run lint
```

## Features

* **Dynamískar um okkur- og vörusíður** úr DatoCMS gegnum GraphQL
* **Útgáfa vöru:** Aðskildir upplýsingar, næringargögn og mynda- & myndbandsgallerí
* **Sía eftir vegan vörum** með viðmóti í vörugrildi
* **Snjall forsíða (HeroSection)** með sveigjanlegum panelum
* **Tengiliðafor­m** sem sendir póst í gegnum Nodemailer
* **Markdown styður** fyrir innihald með remark-gfm
* **Responsive myndir** með Next/Image og sérsniðnum hlutföllum

## Tech Stack

* **Framework:** Next.js 15.3.2
* **Language:** TypeScript, React 19.1.0
* **Styling:** SCSS modules, Sass 1.88.0
* **Data Fetching:** graphql-request, DatoCMS
* **Validation:** zod 3.25.1
* **Mail:** nodemailer 7.0.3
* **Markdown:** react-markdown, remark-gfm

## Configuration

Búðu til skrána `.env.local` í rót verkefnisins með eftirfarandi breytum:

```env
DATO_API_TOKEN=þinn_dato_token
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
CONTACT_EMAIL=grimurkokkur@grimurkokkur.is
NODE_ENV=development
```

## API Reference

### `POST /api/contact`

Sendir tengiliðaskilaboð með JSON líkama:

```json
{
  "name": "Þitt nafn",
  "email": "netfang@example.com",
  "message": "Skilaboðin þín hér"
}
```

* **Svátt**: 200 OK – sending tókst
* **422**: Validation villa – ófullnægjandi gögn
* **500**: Innri þjónustuvilla

## Contributing

1. Fork-aðu þetta repo
2. Búðu til grein: `git checkout -b feature/Þitt-feature-nafn`
3. Commit-aðu breytingar: `git commit -m "Bætt við einhverju"`
4. Push-aðu grein: `git push origin feature/Þitt-feature-nafn`
5. Opnaðu Pull Request

## License

Distributed under the **MIT License**. Skoðaðu [LICENSE](LICENSE) skrána fyrir nánari upplýsingar.

## Authors

* **Þitt nafn** – [Andri Páll Helgason](https://github.com/aph8) – [aph8@hi.is](mailto:aph8@hi.is)

## Acknowledgements

* [DatoCMS](https://www.datocms.com) – Innihaldsstjórnunargrind
* [Next.js](https://nextjs.org) – Veframmagerðargrunnur
* [Zod](https://github.com/colinhacks/zod) – Gagnasannprófun
