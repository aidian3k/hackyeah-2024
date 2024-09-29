import StudiesAutocomplete from '@/features/common/StudiesAutocomplete/StudiesAutocomplete.component';
import UnitsAutocomplete from '@/features/common/UnitsAutocomplete/UnitsAutocomplete.component';
import UniversitiesAutocomplete from '@/features/common/UniversitiesAutocomplete/UniversitiesAutocomplete.component';
import { LearningResourcesFilterInputs } from '@/ts/interface/LearningResource';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

const MainPageFilters = () => {
  const formMethods = useForm<LearningResourcesFilterInputs>();

  const onSubmit = (data: LearningResourcesFilterInputs) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1 ">
              <UniversitiesAutocomplete fieldName="institutionId" />
            </div>

            <div className="col-span-1">
              <UnitsAutocomplete institutionFieldName="institutionId" unitFieldName="unitId" />
            </div>

            <div className="col-span-1">
              <StudiesAutocomplete studyFieldName="studyId" unitFieldName="unitId" />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MainPageFilters;
