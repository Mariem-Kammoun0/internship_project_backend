<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\JobOffer;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $offerId)
    {
        $jobOffer = JobOffer::find($offerId);

        if (!$jobOffer) {
            return response()->json(['message' => 'Job offer not found'], 404);
        }

        $applications = $jobOffer->applications;
        return response()->json($applications);
    }

    /**
     *  creating a new application.
     */
    public function store(Request $request, string $offerId)
    {
        $jobOffer = JobOffer::find($offerId);
        if (!$jobOffer) {
            return response()->json(['message' => 'Job offer not found'], 404);
        }

        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        //prevent duplicate applications
        $alreadyApplied = Application::where('user_id', $user->id)
            ->where('job_offer_id', $offerId)
            ->exists();

        if ($alreadyApplied) {
            return response()->json([
                'message' => 'You have already applied to this job offer.'
            ], 409);
        }

        $validated = $request->validate([
            'motivation_letter' => 'nullable|string|max:5000',
        ]);

        $application = new Application();
        $application->job_offer_id = $offerId;
        $application->user_id = $user->id;
        $application->motivation_letter = $validated['motivation_letter'] ?? null;


        $application->save();
        return response()->json([
            'message' => 'Application created successfully',
            'application' => $application],
         201);
    }


    /**
     * Display the candidates applications.
     */
    public function myApplications()
    {
        $userId = auth()->user()->id;
        $applications = Application::where('user_id', $userId)->get();
        if ($applications->isEmpty()) {
            return response()->json(['message' => 'No applications found for this user'], 404);
        }
        return response()->json($applications);
    }

    /**
     * Update the specified resource in storage.
     */
    public function addMotivationLetter(Request $request, string $id){
        $application = Application::find($id);
        $userId=auth()->user()->id;
        if ($application->user_id!=$userId){
            return response()->json(['message' => 'this is not your application to modify'], 403);
        }
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $validated = $request->validate([
            'motivation_letter' => 'required|string|max:5000',
        ]);

        $application->motivation_letter = $validated['motivation_letter'];
        $application->save();

        return response()->json(['message' => 'Motivation letter added successfully', 'application' => $application]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        if ($application->user_id !== auth()->id()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }

    /**
     * Reject an application.
     */
    public function rejectApplication(int $offerId, string $applicationId)
    {

        $jobOffer = JobOffer::find($offerId);
        if (!$jobOffer) {
            return response()->json(['message' => 'Job offer not found'], 404);
        }
        $application = Application::find($applicationId);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $company = auth()->user()->company;
        if ($jobOffer->company_id !== $company->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $id= $application->job_offer_id;
        if ($id!== $offerId) {
            return response()->json([
                'message' => 'Application does not belong to this job offer'
            ], 400);
        }

        $application->delete();
        return response()->json([
            'message' =>
            'Application rejected successfully']);
        }
}
