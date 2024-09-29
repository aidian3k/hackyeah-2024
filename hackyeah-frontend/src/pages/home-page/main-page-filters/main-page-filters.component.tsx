import StudiesAutocomplete from '@/features/common/StudiesAutocomplete/StudiesAutocomplete.component';
import UnitsAutocomplete from '@/features/common/UnitsAutocomplete/UnitsAutocomplete.component';
import UniversitiesAutocomplete from '@/features/common/UniversitiesAutocomplete/UniversitiesAutocomplete.component';

const MainPageFilters = () => {
  

  return (
    <div className="w-full">
      
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
        
    </div>
  );
};

export default MainPageFilters;
