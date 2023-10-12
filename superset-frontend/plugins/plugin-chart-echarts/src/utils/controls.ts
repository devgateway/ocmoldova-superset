/**
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

import {
  DataRecord,
  t,
  TimeseriesDataRecord,
  validateNumber,
} from '@superset-ui/core';

export function parseYAxisBound(
  bound?: string | number | null,
): number | undefined {
  if (bound === undefined || bound === null || Number.isNaN(Number(bound))) {
    return undefined;
  }
  return Number(bound);
}

const IGNORE_TRN_KEYS = ['date'];

export function smartTranslateMeta(key: string): string {
  return IGNORE_TRN_KEYS.includes(key)
    ? key
    : key.split(', ').map(t).join(', ');
}

export const renameTrnDataRecordValues = (obj: DataRecord) =>
  Object.entries(obj).reduce<DataRecord>((acc, [key, value]) => {
    if (typeof value === 'string' && value !== '') {
      acc[key] = smartTranslateMeta(value);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {} as DataRecord);

export const renameKeysTrnTimeseriesDataRecord = (obj: TimeseriesDataRecord) =>
  Object.entries(obj).reduce<TimeseriesDataRecord>((acc, [key, value]) => {
    acc[smartTranslateMeta(key)] = value;
    return acc;
  }, {} as TimeseriesDataRecord);

export const renameKeysTrnRecord = (obj: Record<string, string[]>) =>
  Object.entries(obj).reduce<Record<string, string[]>>((acc, [key, value]) => {
    acc[smartTranslateMeta(key)] = value;
    return acc;
  }, {} as Record<string, string[]>);

export function parseNumbersList(value: string, delim = ';') {
  if (!value || !value.trim()) return [];
  return value.split(delim).map(num => {
    if (validateNumber(num)) throw new Error('All values must be numeric');
    return Number(num);
  });
}
