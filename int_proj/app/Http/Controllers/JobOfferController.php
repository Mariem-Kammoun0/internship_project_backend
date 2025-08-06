<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\JobOffer;
use App\Http\Requests\UpdateJobOfferRequest;
use App\Http\Requests\CreateJobOfferRequest;


class JobOfferController extends Controller
{
    /**
     * Display a listing of the resource ->for employer.
     */
    public function index()
    {
        $company = auth()->user()->company;
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
        $jobOffers = $company->jobs;
        return response()->json($jobOffers);
    }

    /**
     * Display a listing of the resource by company -> for potential employees.
     */
    public function getOffersByCompany(string $companyId)
    {
        $company = Company::find($companyId);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        $jobOffers = $company->jobs;

        return response()->json($jobOffers);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function store(CreateJobOfferRequest $request)
        {
            $company = auth()->user()->company;
            if (!$company) {
                return response()->json(['message' => 'Company not found'], 404);
            }
            $jobOffer = $company->jobs()->create($request->validated());
            $jobOffer['company_id'] = $company->id;
            return response()->json(['message' => 'Job offer created successfully', 'job_offer' => $jobOffer], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $jobOffer = JobOffer::find($id);
        if (!$jobOffer) {
            return response()->json(['message' => 'Job offer not found'], 404);
        }
        return response()->json($jobOffer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobOfferRequest $request, string $id)
    {
        $jobOffer = JobOffer::find($id);

        if (!$jobOffer) {
            return response()->json(['message' => 'Job offer not found'], 404);
        }

        if ($jobOffer->company_id !== auth()->user()->company_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $jobOffer->update($request->validated());

        return response()->json(['message' => 'Job offer updated successfully', 'job_offer' => $jobOffer]);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jobOffer = JobOffer::find($id);

        if (!$jobOffer) {
            return response()->json(['message' => 'Job offer not found'], 404);
        }
        
        if ($jobOffer->company_id !== auth()->user()->company_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $jobOffer->delete();

        return response()->json(['message' => 'Job offer deleted successfully']);
    }
}
