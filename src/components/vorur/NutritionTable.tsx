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
    <table className={styles.nutritionTable}>
      <thead>
        <tr>
          <th>Næringarefni</th>
          <th>í 100 g</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <React.Fragment key={i}>
            <tr>
              <td>{row.label}</td>
              <td>{row.value}</td>
            </tr>
            {row.subrows?.map((sub, j) => (
              <tr key={j} className="subRow">
                <td>{sub.label}</td>
                <td>{sub.value}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export default NutritionTable;
