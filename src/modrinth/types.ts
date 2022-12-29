/**
 * @license
 * Copyright (c) 2022 Aton-Kish
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export interface ModrinthProject {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  client_side: string;
  server_side: string;
  body: string;
  additional_categories: string[];
  issues_url?: string;
  source_url?: string;
  wiki_url?: string;
  discord_url?: string;
  donation_urls?: ModrinthDonation[];
  project_type: ModrinthProjectType;
  downloads: number;
  icon_url?: string;
  id: string;
  team?: string;
  moderator_message?: unknown;
  published: ModrinthIso8601;
  updated: ModrinthIso8601;
  approved?: ModrinthIso8601;
  followers: number;
  status: ModrinthStatus;
  license: ModrinthLicense;
  versions: string[];
  gallery?: ModrinthGallery[];
}

export interface ModrinthVersion {
  name: string;
  version_number: string;
  changelog?: string;
  dependencies: ModrinthDependency[];
  game_versions: string[];
  version_type: ModrinthVersionType;
  loaders: string[];
  featured: boolean;
  id: string;
  project_id: string;
  author_id: string;
  date_published: ModrinthIso8601;
  downloads: number;
  files: ModrinthFile[];
}

export interface ModrinthDonation {
  id: string;
  platform: string;
  url: string;
}

export interface ModrinthLicense {
  id: string;
  name: string;
  url?: string;
}

export interface ModrinthGallery {
  url: string;
  featured: boolean;
  title?: string;
  description?: string;
  created: ModrinthIso8601;
}

export interface ModrinthDependency {
  version_id?: string;
  project_id?: string;
  file_name?: string;
  dependency_type: ModrinthDependencyType;
}

export interface ModrinthFile {
  hashes: ModrinthHashes;
  url: string;
  filename: string;
  primary: boolean;
  size: number;
}

export interface ModrinthHashes {
  sha512: string;
  sha1: string;
}

export const ModrinthProjectType = {
  Mod: "mod",
  Modpack: "modpack",
  ResourcePack: "resourcepack",
} as const;
export type ModrinthProjectType = typeof ModrinthProjectType[keyof typeof ModrinthProjectType];

export const ModrinthStatus = {
  Approved: "approved",
  Rejected: "rejected",
  Draft: "draft",
  Unlisted: "unlisted",
  Archived: "archived",
  Processing: "processing",
  Unknown: "unknown",
} as const;
export type ModrinthStatus = typeof ModrinthStatus[keyof typeof ModrinthStatus];

export const ModrinthDependencyType = {
  Required: "required",
  Optional: "optional",
  Incompatible: "incompatible",
  Embedded: "embedded",
} as const;
export type ModrinthDependencyType = typeof ModrinthDependencyType[keyof typeof ModrinthDependencyType];

export const ModrinthVersionType = {
  Release: "release",
  Beta: "beta",
  Alpha: "alpha",
} as const;
export type ModrinthVersionType = typeof ModrinthVersionType[keyof typeof ModrinthVersionType];

export type ModrinthIso8601 = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
