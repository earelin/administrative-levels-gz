terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.31.0"
    }
  }

  backend "gcs" {
    bucket = "earelin-terraform-status"
    prefix = "administrative-levels-gz/prod"
  }
}

provider "google" {
  project = "earelin"
  region  = "europe-west2"
}

resource "google_artifact_registry_repository" "admin-levels-gz" {
  repository_id = "admin-levels-gz"
  format        = "DOCKER"
  location      = "europe-west2"
}
