// src/components/vorur/NutritionTable.tsx
'use client';

import React from 'react';
import styles from '@/styles/vorur/NutritionTable.module.scss';

export type Subrow = { label: string; value: string };
export type NutritionRow = {
  label: string;
  value: string;
  subrows?: Subrow[];
};

interface NutritionTableProps {
  data: NutritionRow[];
}

const NutritionTable: React.FC<NutritionTableProps> = ({ data }) => (
  <div className={styles.wrapper}>
    <table className={styles.nutritionTable} role="table" aria-label="Næringargögn">
      <thead>
        <tr>
          <th scope="col">Næringarefni</th>
          <th scope="col">í 100 g</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <React.Fragment key={row.label}>
            <tr>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
            {row.subrows?.map((sub) => (
              <tr key={sub.label} className={styles.subRow}>
                <th scope="row">{sub.label}</th>
                <td>{sub.value}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export default React.memo(NutritionTable);
