# Nives Administrativos de Galiza

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
  -p, --parroquias  Parroquias shapefiles path (no extension)   [required]
      --help        Show help        
```

Comando usando yarn.

```shell
yarn --silent shapefiles-extract -p path/to/parroquias_shapefiles
```
