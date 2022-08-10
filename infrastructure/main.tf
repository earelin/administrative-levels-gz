terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }

  backend "gcs" {
    bucket = "earelin-terraform-status"
    prefix = "administrative-levels-gz/prod"
  }
}

provider "google" {
  project = "earelin"
  region = "europe-west2"
}
