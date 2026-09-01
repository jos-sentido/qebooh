# CLAUDE.md — Repo `qebooh`

Contexto permanente para Claude Code. Léelo antes de proponer cambios.

---

## 0. Qué es este repo (y qué no es)

Este repo es el **espacio de trabajo general de QEB**: landings, propuestas a
cliente y web apps sueltas — herramientas internas y comerciales.

**No es la plataforma QEB.** La plataforma es un producto aparte, con su propio
stack y sus propios repos (`Develop-QEB/qeb-Back` y su frontend React + Vite).
Nada de lo que se escriba aquí forma parte del producto ni se despliega en
`qeb.mx`. Si un requerimiento pertenece a la plataforma, decirlo y no
implementarlo aquí.

El contexto de negocio de las secciones 1–4 se hereda del CLAUDE.md de la
plataforma porque hace falta para escribir contenido, propuestas y herramientas
correctas. Las reglas técnicas (§5 en adelante) son las de **este** repo.

---

## 1. Qué es QEB

QEB es una plataforma de gestión de publicidad exterior (OOH — _out of home_):
un producto propio dirigido a empresas que comercializan y operan inventario
publicitario en vía pública.

Centraliza tres mundos que antes vivían en Excel y correo:

- **Comercial** — cotización, propuestas, cierre de venta.
- **Operativo** — asignación de inventario, programación, instalación, evidencias.
- **Analítico** — reportes de ventas, ocupación, variaciones e impacto, objetivos.

**Quién es el cliente de QEB.** QEB le vende a la empresa que opera el
inventario (IMU es el caso en operación hoy). Esa empresa, a su vez, le vende
espacios a sus anunciantes. Es una distinción que cambia el contenido de todo lo
que se escriba aquí: una propuesta de QEB habla de implementación, módulos e
integración — no de un plan de medios. El plan de medios es lo que el cliente
arma **usando** QEB.

### La personalización es parte del producto

QEB no se vende como software cerrado. Adaptar la plataforma a la operación de
cada cliente es parte del servicio. Conviven dos capas y hay que saber siempre
en cuál se está trabajando:

| Capa                         | Qué contiene                                                                       | Regla                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Núcleo de producto**       | Flujo comercial, modelo de inventario, tarifas, vigencias, reportería base          | Debe servir a cualquier cliente. Nada específico se cablea aquí. |
| **Personalización por cliente** | Catálogos, nomenclatura propia, integraciones, reglas de negocio, reportes a medida | Vive en configuración o en módulos aislados por cliente.   |

Pregunta por defecto ante cualquier requerimiento: _¿esto es núcleo o es de un
cliente?_ Si es de un cliente, no entra al núcleo.

**Cómo se traduce en este repo** (detalle en §5):

| Carpeta                          | Capa                                                     |
| -------------------------------- | -------------------------------------------------------- |
| `packages/*`                     | Núcleo. Sirve a cualquier cliente; nada específico entra. |
| `apps/*`                         | Depende — una app puede ser general o de un cliente.      |
| `apps/web/content/propuestas/*`  | Personalización: cada archivo es de un cliente concreto.  |

### Flujo central del negocio (núcleo)

```
Solicitud  →  Propuesta  →  Campaña
```

- **Solicitud**: se levanta la necesidad del cliente final (plazas, formatos, fechas, presupuesto).
- **Propuesta**: selección de inventario con tarifas y vigencias. Puede haber varias versiones.
- **Campaña**: la propuesta cerrada. A partir de aquí existe venta, se reserva inventario y arranca operación.

**Regla de oro**: sólo las **campañas cerradas** cuentan como venta. Solicitudes
y propuestas son _pipeline_, no ingreso.

### Tipos de inventario

Parabuses, unipolares, puentes, boleros y formatos grandes (espectaculares),
distribuidos por **plaza**.

---

## 2. Glosario

Usa estos términos tal cual en código, comentarios, UI y documentos. **No los
traduzcas al inglés.**

### 2.1 Núcleo de producto

| Término                          | Significado                                                                 |
| -------------------------------- | --------------------------------------------------------------------------- |
| **Solicitud / Propuesta / Campaña** | Las tres etapas del flujo comercial.                                     |
| **Catorcena**                    | Periodo de facturación de 14 días. Unidad base de vigencia y tarifa, no el mes. |
| **Cara**                         | Cada lado publicitario de una estructura. Una estructura puede tener varias caras y cada cara se vende por separado. |
| **Flujo / Contraflujo**          | Sentido de circulación vehicular al que mira la cara.                       |
| **Plaza**                        | Ciudad o mercado (GDL, CDMX, MTY, etc.).                                     |
| **Código Único**                 | Identificador de inventario. Formato: `{code}_{Flujo\|Contraflujo}_{Plaza}`  |
| **Versionario**                  | Control de qué creatividad (versión de arte) va en cada cara.                |
| **Tarifa pública**               | Tarifa de lista del inventario.                                              |

### 2.2 Específico de IMU

⚠️ **Estos términos NO son del producto.** Nacieron de la personalización hecha
para IMU. No los uses como nomenclatura general, no los metas en `packages/*` y
no asumas que existen para otro cliente.

| Término                       | Significado                                            | Equivalente en producto              |
| ----------------------------- | ------------------------------------------------------ | ------------------------------------ |
| **CUIC**                      | Identificador de cliente en la nomenclatura de IMU.    | Identificador de cliente genérico.   |
| **APS Global / APS Específico** | Modalidades de asignación de inventario propias de IMU. | Modalidades de asignación configurables. |
| **Tarifa efectiva**           | Tarifa con descuento, según el modelo de descuentos de IMU. | Tarifa con descuento (reglas del cliente). |
| **Tráfico**                   | Área de IMU que asigna y programa el inventario.       | Área operativa del cliente.          |
| **Mejora Continua**           | Área de IMU que audita procesos y calidad de datos.    | Área de auditoría del cliente.       |
| **INVIAN**                    | Sistema externo de instalación usado por IMU.          | Integración con sistema de instalación. |

### 2.3 Integraciones

QEB se integra vía API con software externo del cliente. **SAP** es el caso en
operación hoy (ERP de IMU), pero la capacidad es general: el ERP a integrar
depende de cada cliente y **no debe asumirse SAP por defecto** en ningún diseño,
texto o diagrama.

---

## 3. Reglas de negocio

### 3.1 Núcleo de producto

1. **Sólo las campañas cerradas son venta.** La inversión y sus variaciones se
   derivan exclusivamente de ventas cerradas; el pipeline (Solicitud →
   Propuesta) se reporta aparte, en embudo.
2. **Normalizar antes de cruzar inventario.** Todo cruce por Código Único debe
   normalizar (`trim` + case) antes de comparar. Los archivos externos traen
   espacios al final y mayúsculas inconsistentes; sin normalizar se generan
   falsos negativos.
3. **La vigencia se razona en catorcenas**, no en meses ni en días sueltos.

### 3.2 Específico de IMU

1. **Inversión = tarifa pública, no tarifa efectiva.** Aunque la UI muestre
   tarifa efectiva, todo cálculo de inversión parte de tarifa pública. Es el
   origen histórico de discrepancias entre vistas: si dos pantallas no cuadran,
   revisa primero cuál tarifa usa cada una. _(Regla del modelo de descuentos de
   IMU; no asumirla para otro cliente.)_
2. **Objetivos: la matriz semanal de asesores es la fuente de verdad.** No se
   recalculan desde otra fuente.
3. **Reportes de Ventas (BI, Variaciones e impacto, Embudo, Objetivos)** es un
   desarrollo hecho para IMU. BI y Variaciones consideran únicamente ventas
   cerradas; Embudo mantiene el pipeline completo.

---

## 4. Diagnóstico y causa raíz

Aplica a cualquier análisis, aquí o sobre la plataforma:

- **Nunca inventes ni infieras una causa raíz.** Si no está confirmada por logs,
  código o documentación, se dice explícitamente que se desconoce. Aplica con
  más fuerza en cualquier texto que vaya al cliente.
- **Un HTTP 200 no significa sistema sano.** Los problemas conocidos de QEB
  (colgados de socket, agotamiento del pool) se presentan sin errores HTTP.

---

## 5. Stack y estructura de este repo

Monorepo con pnpm workspaces + Turborepo. Requiere **Node 20+** (probado en 22)
y **pnpm 10** (`corepack enable`).

```
apps/
  web/            Sitio principal + landings de propuesta
packages/
  ui/             Sistema de diseño: tokens y componentes compartidos
  config/         Configuraciones base de TypeScript
```

`apps/web` es **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4**,
pensado para desplegar en Vercel con Root Directory `apps/web`.

> No confundir con el stack de la plataforma (React + Vite, Node + Prisma, MySQL
> en DigitalOcean). Son proyectos distintos.

### Comandos

Todos desde la raíz:

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de producción de todo el monorepo
pnpm typecheck    # TypeScript en todos los paquetes
pnpm lint         # ESLint
```

No hay suite de pruebas todavía. `pnpm typecheck && pnpm lint && pnpm build` es
la verificación mínima antes de dar por buena una tarea.

### Reglas del repo

1. **`packages/*` es núcleo.** Nada de un cliente concreto entra ahí: ni
   nomenclatura de IMU, ni colores de una campaña, ni reglas de negocio
   particulares. Si un componente necesita algo específico, se parametriza.
2. **Al proponer una solución, indicar si va al núcleo o a la capa de cliente.**
3. **Una propuesta es contenido, no una página a mano.** Se declara como objeto
   del tipo `Propuesta` en `apps/web/content/propuestas/` y se registra en el
   índice. El renderer usa un `switch` exhaustivo: un tipo de bloque nuevo rompe
   el typecheck hasta que se implementa, a propósito.
4. **Añadir un cliente no debe requerir tocar `packages/*`.** Si lo requiere, es
   señal de que falta un punto de configuración en el núcleo.

Detalle de arquitectura en [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

### Privacidad de las propuestas

Las páginas de propuesta llevan `noindex` y están bloqueadas en `robots.txt`.
**Eso no es control de acceso**: cualquiera con el enlace las abre. Si una
propuesta lleva tarifas, márgenes o datos que no pueden circular, hay que
ponerle autenticación antes de compartirla. No asumir que "no indexado" equivale
a "privado" en ningún texto que vaya al cliente.

---

## 6. Convenciones de entregables

### Cómo se escribe el nombre

**El nombre es QEB.** *OOH* es un complemento descriptivo — la categoría en la
que opera —, no parte del nombre. En texto corrido se escribe **QEB** a secas:
"QEB centraliza…", nunca "QEB OOH centraliza…". El complemento sólo aparece
como descriptor junto al logotipo, en tamaño y peso menores (ver
`packages/ui/src/logo.tsx`).

El repo se llama `qebooh` y el scope de los paquetes es `@qebooh/*`: eso es un
identificador técnico, no la marca. No usarlo como nombre en ningún texto que
vea el cliente.

### Identidad visual QEB

Definida en `packages/ui/src/styles.css`. Cambiar un valor ahí se propaga a todo
el repo.

| Uso            | Color                                              |
| -------------- | -------------------------------------------------- |
| Fondo          | `#0e0e1a` — token `fondo`                          |
| Superficies    | `#181830` — token `superficie`                     |
| Barra de marca | `#7B2FBE` / `#5B2D6E` — tokens `marca-500` / `marca-700` |
| Títulos        | `#c9a0ff` — token `titulo`                         |
| Acentos        | ámbar `#f5a524`, cian `#22d3ee`, magenta `#e879f9` |

Los tokens `marca-400`, `superficie-alta`, `borde`, `texto` y `texto-tenue` son
derivados (no están en la guía): se calcularon para cubrir hover, elevación,
bordes y jerarquía de texto manteniendo contraste AA. Están marcados como tales
en el CSS.

### Generación de documentos

- **PDF** → ReportLab (Python)
- **Word** → `docx` (Node) o `python-docx`
- **Excel** → openpyxl
- **Dashboards HTML** → React + Chart.js/Recharts, archivo único autocontenido con dependencias por CDN

### Comunicación con clientes

- Español directo, conciso, profesional.
- **Evitar**: "me permito", "permítanme", "quedamos amablemente".
- Aperturas tipo: _"Comparto lo acordado para su respectivo seguimiento"_.
- Cierres tipo: _"Quedo atento a sus comentarios para lograr avanzar…"_.
- Firma: **Jos Alvarez** o **Jos**. Nunca "José Luis".
- Tono colaborativo, no impositivo, especialmente con interlocutores de dirección.
- Los errores de origen del cliente se documentan con cadena de evidencia
  factual y secuencia temporal, sin acusación directa.

---

## 7. Equipo

**QEB**

- **Jos Alvarez** — líder de plataforma.
- **Mario** — TI / backend.
- **Akary** — desarrollo.
- **Bladimir** — asesores.
- **Antonio** — soporte (respaldo).

**Interlocutores de IMU**

- **Alfredo** — dirección, aprobador y principal aliado del proyecto.
- **Ángel** — aliado cercano.
- **Joel Palafox** — Tráfico. Punto de fricción recurrente.
- **Dulce Angélica** — Tráfico / Mejora Continua.
- **Brenda Aylin Plasencia Sotelo** — analista de Mejora Continua.
- Áreas: Tráfico, Operaciones, Analistas ASC, Mejora Continua.

---

## 8. Restricciones operativas

- **Asana: sólo lectura.** No crear ni modificar tareas desde código o agentes;
  únicamente reflejar datos en dashboards o documentos.
  - Proyecto QEB React: GID `1212297240867460`
  - Convención de tags por cliente: `visita (cliente)` — ej. `visita imu`, GID `1214053553753871`
- **Defensa de IP**: QEB es producto propio y su historial de desarrollo es el
  activo que lo respalda. Mantener trazabilidad permanente (commits,
  comunicaciones, decisiones de diseño) y dejar claro qué es núcleo y qué es
  personalización para un cliente. La similitud funcional por sí sola no es
  accionable; la trazabilidad del desarrollo sí protege. En la práctica: commits
  descriptivos, y decisiones de diseño anotadas donde viven, no en un chat.

---

## 9. Flujo de trabajo esperado

1. **Analizar y confirmar metodología antes de generar el entregable** en tareas
   de datos. Jos valida el enfoque cuando el resultado va a escalar o a decisión
   de cliente.
2. **Aplicar las correcciones exactamente como se indican**, sin reinterpretar.
   Si una instrucción previa se revierte, eliminar por completo los restos de la
   versión anterior.
3. **Entregar archivos completos y listos para usar**, no fragmentos.
4. **Cuando falte información, decirlo.** No rellenar con supuestos.
5. **Al proponer una solución, indicar si va al núcleo o a la capa de cliente.**
