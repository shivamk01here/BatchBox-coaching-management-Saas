<?php

namespace App\Observers;

use App\Models\Report;
use App\Models\User;

class ReportObserver
{
    /**
     * Handle the Report "created" event.
     */
    public function created(Report $report): void
    {

        // Logic: If the newly created report has a grade of 'D' or 'F'
        if (in_array($report->grade, ['D', 'F'])) {
            // Then, automatically create a new Feedback record associated with this report.
            $report->feedbacks()->create([
                'comments' => 'This student needs support. Low performance detected.', // Using 'comments' as per FeedbackFactory
                'user_id' => User::first()->id ?? 1, // Assign to the first user found (e.g., admin), default to 1 if no user exists.
                                                      // For production, ensure a specific admin user ID is used or created.
                'rating' => 1, // A low rating to indicate poor performance
            ]);
        }
    }

    /**
     * Handle the Report "updated" event.
     */
    public function updated(Report $report): void
    {
        //
    }

    /**
     * Handle the Report "deleted" event.
     */
    public function deleted(Report $report): void
    {
        //
    }

    /**
     * Handle the Report "restored" event.
     */
    public function restored(Report $report): void
    {
        //
    }

    /**
     * Handle the Report "force deleted" event.
     */
    public function forceDeleted(Report $report): void
    {
        //
    }
}
