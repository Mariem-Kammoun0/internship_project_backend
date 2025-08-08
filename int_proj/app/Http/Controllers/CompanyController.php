<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $query = Company::query();
        if ($request->filled('name')) {
            $query()->byName($request->name);
        }
        if ($request->filled('industry')) {
            $query()->byIndustry($request->name);
        }
        if ($request->filled('size')) {
            $query()->bySize($request->size);        
        }
        if ($request->filled('location')) {
            $query()->byLocation($request->location);
        }
        $results = JobOffer::query()->paginate(10);

        if ($results->isEmpty()) {
            return response()->json(['message' => 'No companies found'], 404);
        }
        
        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {   
        $user = auth()->user();
        if ($user->company_id) {
            return response()->json(['message' => 'please create another account to create another company'], 400);
        }

        $company = Company::create([
            ...$request->validated(),
            'employer_id' => $user->id,
            'company_size'=>1,
        ]);

        $user->company_id = $company->id;
        $user->save();

        return response()->json([
            'message' => 'Company created successfully',
            'company' => $company
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $company = auth()->user()->company;

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
        return response()->json($company);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, string $id)
    {
        $company = auth()->user()->company;
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
        $company->update($request->validated());
        return response()->json([
            'message' => 'Company updated successfully',
            'company' => $company
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $company=user()->auth()->company;
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
        $company->delete();
        $user->company_id = null;
        $user->save();
        return response()->json(['message' => 'Company deleted successfully']);
    }
}
