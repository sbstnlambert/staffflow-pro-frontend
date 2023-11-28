import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { environment } from 'src/environments/environment';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return employees', () => {
    const mockEmployees = [
        { id: 1, name: 'John Doe', email: 'john@example.com', jobTitle: 'Developer', phone: '123-456-7890', imageUrl: 'imageUrl', employeeCode: '45889-h256' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', jobTitle: 'Designer', phone: '987-654-3210', imageUrl: 'imageUrl', employeeCode: '65874-g203' }
      ];

    service.getEmployees().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/employees`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should add an employee', () => {
    const mockEmployees = { id: 1, name: 'John Doe', email: 'john@example.com', jobTitle: 'Developer', phone: '123-456-7890', imageUrl: 'imageUrl', employeeCode: '45889-h256' };

    service.addEmployee(mockEmployees).subscribe((employee) => {
      expect(employee).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/employees/add`);
    expect(req.request.method).toBe('POST');
    req.flush(mockEmployees);
  });

  it('should update an employee', () => {
    const mockEmployees = { id: 1, name: 'John Doe', email: 'john@example.com', jobTitle: 'Developer', phone: '123-456-7890', imageUrl: 'imageUrl', employeeCode: '45889-h256' };

    service.updateEmployee(mockEmployees).subscribe((employee) => {
      expect(employee).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/employees/update`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockEmployees);
  });

  it('should delete an employee', () => {
    const employeeId = 1;

    service.deleteEmployee(employeeId).subscribe(() => {
      // No response expected for a delete request
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/employees/delete/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
