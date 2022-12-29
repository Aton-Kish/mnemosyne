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

import { assert, assertFalse } from "../../test_deps.ts";
import { isModrinthIso8601 } from "./mod.ts";

Deno.test("isModrinthIso8601", async (t) => {
  const positiveCases: { arg: string }[] = [
    { arg: "2006-01-02T15:04:05.999999Z" },
  ];
  for (const { arg } of positiveCases) {
    await t.step(`positive case: ${arg}`, () => {
      assert(isModrinthIso8601(arg));
    });
  }

  const negativeCases: { arg: string }[] = [
    { arg: "Mon Jan _2 15:04:05 2006" },
    { arg: "Mon Jan _2 15:04:05 MST 2006" },
    { arg: "Mon Jan 02 15:04:05 -0700 2006" },
    { arg: "02 Jan 06 15:04 MST" },
    { arg: "02 Jan 06 15:04 -0700" },
    { arg: "Monday, 02-Jan-06 15:04:05 MST" },
    { arg: "Mon, 02 Jan 2006 15:04:05 MST" },
    { arg: "Mon, 02 Jan 2006 15:04:05 -0700" },
    { arg: "2006-01-02T15:04:05Z07:00" },
    { arg: "2006-01-02T15:04:05.999999999Z07:00" },
    { arg: "3:04PM" },
    { arg: "Jan _2 15:04:05" },
    { arg: "Jan _2 15:04:05.000" },
    { arg: "Jan _2 15:04:05.000000" },
    { arg: "Jan _2 15:04:05.000000000" },
  ];
  for (const { arg } of negativeCases) {
    await t.step(`negative case: ${arg}`, () => {
      assertFalse(isModrinthIso8601(arg));
    });
  }
});
