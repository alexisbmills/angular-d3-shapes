import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';
import {scaleOrdinal} from 'd3-scale';
import {schemePastel2} from 'd3-scale-chromatic';
import {Subscription} from 'rxjs/Subscription';
import {LegendItem} from './shared/chart-legend/component/chart-legend/chart-legend.component';
import {Subject} from 'rxjs/Subject';

export interface FormItem {
  [key: string]: FormControl;
}

export interface FormChanges {
  [key: string]: string;
}

export interface Candidate {
  key: string;
  name: string;
  votes: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  colors = scaleOrdinal(schemePastel2);

  voteForm: FormGroup;

  formChanges: Subscription;

  candidateChanges: Subscription;

  candidatesSubject: Subject<Candidate[]> = new Subject();

  candidates: Candidate[] = [];

  isDestroyed: Subject<boolean> = new Subject();

  names: string[] = [];

  votes: number[] = [];

  legend: LegendItem[] = [];

  leadingCandidate: Candidate;

  leadingCandidateIndex = 0;

  constructor() {
  }

  ngOnInit(): void {
    const candidates = [
      {
        key: 'JP',
        name: 'John Public',
        votes: 500
      },
      {
        key: 'JD',
        name: 'Jane Doe',
        votes: 250,
      },
      {
        key: 'CB',
        name: 'Carlos Browne',
        votes: 250
      }
    ];

    this.initForm(candidates);
    this.initCandidateChanges();
    this.candidatesSubject.next(candidates);
  }

  private initForm(candidates: Candidate[]) {
    const formGroups = candidates.reduce((groups: FormItem, candidate: Candidate, index: number): FormItem => {
      groups[candidate.key] = new FormControl(candidates[index].votes || 0, Validators.required);
      return groups;
    }, {});
    this.voteForm = new FormGroup(formGroups);

    this.formChanges = this.voteForm.valueChanges
      .takeUntil(this.isDestroyed)
      .debounceTime(400)
      .withLatestFrom(this.candidatesSubject)
      .map((latest: [FormChanges, Candidate[]]): Candidate[] => {
        return latest[1].map((candidate: Candidate): Candidate => {
          return {...candidate, votes: parseInt(latest[0][candidate.key] || '0', 10)};
        });
      })
      .do((latestCandidates: Candidate[]) => this.candidatesSubject.next(latestCandidates))
      .subscribe();
  }

  private initCandidateChanges() {
    this.candidateChanges = this.candidatesSubject
      .takeUntil(this.isDestroyed)
      .do((candidates: Candidate[]) => {
        this.votes = candidates.map(candidate => candidate.votes);
        this.names = candidates.map(candidate => candidate.name);
        this.legend = candidates.map((candidate): LegendItem => {
          return {label: candidate.name, description: `${candidate.votes} votes`};
        });
        this.leadingCandidate = candidates.reduce((previousValue, currentValue) => {
          if (!previousValue || previousValue.votes <= currentValue.votes) {
            return currentValue;
          }
          return previousValue;
        });
        this.leadingCandidateIndex = candidates.findIndex((candidate) => candidate.key === this.leadingCandidate.key);
        this.candidates = candidates;
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.isDestroyed.next(true);
  }
}
