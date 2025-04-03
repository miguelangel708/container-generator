# Container Editor Project

Container Editor is an open-source tool designed to simplify the creation and configuration of microservices-based projects. It provides an intuitive interface where users can define containers, assign technologies, and automatically generate structured projects with pre-configured settings.

By automating essential setup tasks—such as defining architectures, handling dependencies, and generating Docker configurations—this tool ensures consistency across services and accelerates development from the very beginning.

Currently, the frontend is built in React, enabling interactive container and technology selection. Future updates will introduce a backend in Spring Boot to generate complete project structures dynamically, along with additional features such as advanced configurations, GitHub integration, and a CLI version for terminal-based project generation.

## Requirements

To run this project, make sure you have installed:
- Node.js (v16 or later)
- npm or yarn

## Installation

Clone the repository and run the following commands:

```bash
# Install dependencies
npm install
```

## Libraries Used

The project uses the following main libraries:

- `vite` - Frontend build tool
- `react` - Main framework for the user interface.
- `@dnd-kit/core` - Drag and drop handling.
- `jszip` - ZIP file generation.
- `zustand` - Manage state
- `typescript` - More readable code and typed implement

To install the required dependencies, run:

```bash
npm install react @dnd-kit/core jszip
```

## Execution

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:4173/`.

## Usage

1. Click the `+` button to add a new container.
2. Drag technologies into the containers.
3. Click a container to edit its information.
4. Download the configuration as a JSON file or generate an empty ZIP file.

## Author

Developed by [Your Name or Company].

## License

This project is licensed under the [MIT License](LICENSE).
