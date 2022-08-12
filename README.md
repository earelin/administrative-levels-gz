# Niveis Administrativos de Galiza

Servizo cos niveis administrativos de Galiza.

## Instalacion

```shell
yarn install
```

## Uso

### Extraer informacion

#### Nomenclator

Extraer as divisions administrativas do nomenclator.

```shell
yarn --silent nomenclator-extract path/to/nomenclator-file.csv
```

#### Shapefiles

Extraer as divisions administrativas dos shapefiles.

```shell
shapefile-extract -p [shapefiles_path]

Options:
      --version     Show version number
  -e, --entidades   Entidades de poboacion shapefiles path (no extension)   [required]
  -p, --parroquias  Parroquias shapefiles path (no extension)               [required]
      --help        Show help        
```

Comando usando yarn.

```shell
yarn --silent shapefiles-extract -e path/to/entidates_shapefiles -p path/to/parroquias_shapefiles
```

### Lanzar a applicacion en local

```shell
yarn start-prod
```

A application sera acesibel polo porto 9000
