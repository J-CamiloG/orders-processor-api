<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Order Processor – Microservicio Externo

Este microservicio es el encargado de recibir y procesar las órdenes enviadas de forma asíncrona por la API de Laravel. Utiliza **Prisma ORM** para la gestión de datos y **Swagger** para la documentación de sus endpoints.


Este microservicio no funciona de manera aislada; es una pieza del ecosistema de gestión de órdenes. Para gestionar las importaciones masivas, el procesamiento de colas y la administración principal, accede a la API Orquestadora:

* ** API Orquestadora (Laravel):** [Enlace al Repositorio de la API Principal](https://github.com/J-CamiloG/Orders-api)
* ** Documentación Principal:** [Wiki del Proyecto](https://github.com/J-CamiloG/Orders-api/blob/main/README.md)

> **Flujo de Comunicación:** Laravel (Puerto 8000) ➡️ Redis Queue ➡️ **NestJS Processor (Puerto 3000)** ➡️ PostgreSQL.

---

###  Tabla de Contenidos

1. [ Tecnologías principales](#-tecnologías-principales)
2. [ Requisitos del sistema](#-requisitos-del-sistema)
3. [ Instalación y Configuración](#-instalación-y-configuración)
4. [ Arquitectura del Procesador](#-arquitectura-del-procesador)
5. [ Documentación de la API (Swagger)](#-documentación-de-la-api-swagger)
6. [ Scripts Disponibles](#-scripts-disponibles)

---

### 🔹 Tecnologías principales

<details>
<summary>Ver Stack Tecnológico</summary>

- **NestJS 11:** Framework Node.js de última generación para aplicaciones escalables.
- **Prisma ORM (v7.2.0):** Herramienta de base de datos de nueva generación para Node.js y TypeScript.
- **PostgreSQL:** Base de datos relacional (vía driver `pg`).
- **Validation:** Uso de `class-validator` y `class-transformer` para asegurar la integridad de los datos.
- **Swagger UI:** Integrado mediante `@nestjs/swagger` para pruebas interactivas.

</details>

---

### 🔹 Requisitos del sistema

* **Node.js:** `^18.x` o superior (Recomendado v22.x por dependencias).
* **NPM:** Gestión de paquetes incluida en Node.js.
* **PostgreSQL:** Una instancia de base de datos activa.
* **Prisma CLI:** Instalado mediante las dependencias del proyecto.

---

### 🔹 Instalación y Configuración

<details>
<summary>Ver pasos de despliegue</summary>

#### 1. Clonar e Instalar
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto y configura tu base de datos:
```bash
DATABASE_URL=""
PORT=
```
### 3. Configuración de Prisma
Sincroniza el esquema con tu base de datos:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Iniciar el Servicio
Sincroniza el esquema con tu base de datos:
```bash
npm run start:dev
```

</details>

---

### 🔹 Arquitectura del Procesador

El microservicio está diseñado para ser desacoplado:
* Endpoint de Entrada: Recibe peticiones POST desde el Worker de Laravel.
* Validación: Filtra datos incorrectos antes de tocar la base de datos.
* Persistencia (Prisma): Registra la orden en la tabla external_orders.
* Logs: Genera registros en processing_logs para trazabilidad de errores o éxito.

---


### 🔹 Documentación de la API (Swagger)

NestJS genera automáticamente la documentación de los endpoints. Una vez que el servidor esté corriendo, puedes acceder en:

* URL: http://localhost:3000/api

* Endpoint principal de integración:

* POST /external/orders: Recibe el objeto de la orden para procesar.

---

  
