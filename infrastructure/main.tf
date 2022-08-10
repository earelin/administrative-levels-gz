provider "google" {
  project = "earelin"
  region = "europe-west2"
}

terraform {
  backend "gcs" {
    bucket = "earelin-terraform-status"
    prefix = "administrative-levels-gz/prod"
  }
}
