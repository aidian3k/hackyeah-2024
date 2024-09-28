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
          <div className="flex justify-evenly">
            <UniversitiesAutocomplete fieldName="institutionId" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MainPageFilters;
