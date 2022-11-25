# TPO Aplicaciones Interactivas - Grupo 19
Aplicación de un marketplace de clases particulares, proyecto integrador de la materia Aplicaciones Interactivas de UADE - Turno Viernes Noche - 2022.

# Arquitectura de la app
_TODO: poner diagrama_

## Requisitos
- [NodeJS](https://nodejs.org/en/download/)
- Poseer una <b>MONGODB_URI</b> válida para comunicarse con la base de datos
- <b>Opcional:</b> [Docker Compose](https://docs.docker.com/compose/install/)

# Backend & Frontend
Esta app corre el frontend y backend como dos módulos separados en paralelo. A continuación se detalla cómo instalar las dependencias y correr la aplicación.

## Descargar la aplicación e instalar dependencias
```bash
git clone git@github.com:enuelx/marketplace-profesores-particulares.git marketplace
cd marketplace && cd api
npm install
cd ../frontend
npm install
cd ..
```

## Crear archivo de ambiente
```bash
cd api
cp .env.example .env
cd ..
```

<b>Agregar los datos que faltan dentro del .env</b>

## Ejecutar la app
### Por Terminal
```bash
cd api
npm start &
cd .. && cd frontend
npm start &
```

### Por Docker compose
#### Start Containers
```bash
docker-compose up --build -d
```

#### Stop Containers

```bash
docker-compose down
```

## Healthcheck

### Backend
![img](https://i.postimg.cc/N0QSHDq1/Captura-de-pantalla-2022-11-25-a-la-s-16-22-35.png)
### Frontend
![img](https://i.postimg.cc/zGC4vMMz/Captura-de-pantalla-2022-11-25-a-la-s-16-29-22.png)

<h5>Ahora tanto el backend como el frontend están listos para usar.</h5>

## Casos de Uso
_TODO: diagramas de casos de uso_
