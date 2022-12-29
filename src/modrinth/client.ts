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

import { mustGet } from "../env/mod.ts";
import type { ModrinthProject, ModrinthVersion } from "./types.ts";

export class ModrinthClient {
  #endpoint: string;
  #userAgent: string;

  constructor() {
    this.#endpoint = mustGet("MNEMOSYNE_MODRINTH_API_ENDPOINT");
    this.#userAgent = mustGet("MNEMOSYNE_USER_AGENT");
  }

  async listUserProjects(user: string) {
    const url = `${this.#endpoint}/user/${user}/projects`;

    const res = await this.#fetch(url);
    const projects = await res.json() as ModrinthProject[];

    return projects;
  }

  async listVersions(...versionIds: string[]) {
    const params = new URLSearchParams();
    params.set("ids", JSON.stringify(versionIds));

    const url = `${this.#endpoint}/versions?${params.toString()}`;

    const res = await this.#fetch(url);
    const versions = await res.json() as ModrinthVersion[];

    return versions;
  }

  async #fetch(input: URL | Request | string, init?: RequestInit): Promise<Response> {
    const res = await fetch(input, {
      headers: { "User-Agent": this.#userAgent },
      ...init,
    });

    return res;
  }
}
