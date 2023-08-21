/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { TS_REGEX } from './normalizeTimestamp';

<<<<<<<< HEAD:superset-frontend/packages/superset-ui-core/src/time-format/utils/denormalizeTimestamp.ts
export default function normalizeTimestamp(value: string): string {
  const match = value.match(TS_REGEX);
  if (match) {
    return `${match[1]}T${match[2]}`;
  }
  return value;
========
export const TS_REGEX = /(\d{4}-\d{2}-\d{2})[\sT](\d{2}:\d{2}:\d{2}\.?\d*).*/;

export default function createMetadata(useLegacyApi = false) {
  return new ChartMetadata({
    description: '',
    name: t('Line Chart'),
    thumbnail,
    useLegacyApi,
  });
>>>>>>>> 2.1.1rc3:superset-frontend/plugins/preset-chart-xy/src/Line/createMetadata.ts
}
