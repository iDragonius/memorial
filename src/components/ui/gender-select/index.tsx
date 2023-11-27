import React, { FC } from "react";
import Select, { SelectDataProps } from "@/components/ui/select";
import { gendersData } from "@/components/ui/gender-select/genders.data";

export interface GenderSelectProps {
  selected: SelectDataProps | null;
  onChange: (data: SelectDataProps) => void;
}

const GenderSelect: FC<GenderSelectProps> = ({ selected, onChange }) => {
  return (
    <div>
      <Select
        label={"Cins*"}
        placeholder={"Cinsi daxil edin"}
        data={gendersData}
        selected={selected}
        onChange={onChange}
      />
    </div>
  );
};

export default GenderSelect;
