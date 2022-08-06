import pickle
from jobposting.models import Job

from django.core.management import BaseCommand
from sklearn.utils import shuffle
from sklearn.metrics import classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer

class Command(BaseCommand):
    def _get_text(self, jobs):
        all_text = []
        for j in jobs:
            text = ""
            text += j.title
            text += " " + j.description
            try:
                text += " " + j.requirements.description
            except:
                pass
            all_text.append(text)
        return all_text

    def handle(self, *args, **kwargs):
        fraud_jobs = list(Job.objects.filter(fraudulent=True))
        clear_jobs = list(Job.objects.filter(fraudulent=False))

        fraud_jobs = shuffle(fraud_jobs)
        clear_jobs = shuffle(clear_jobs)
        fraud_text, clear_text = self._get_text(fraud_jobs), self._get_text(clear_jobs)
        train_text = fraud_text[:int(0.8 * len(fraud_jobs))] + clear_text[:int(0.8 * len(clear_jobs))]
        test_text = fraud_text[int(0.8 * len(fraud_jobs)):] + clear_text[int(0.8 * len(clear_jobs)):]
        train_y = [1] * int(0.8 * len(fraud_jobs)) + [0] * int(0.8 * len(clear_jobs))
        test_y = [1] * (len(fraud_jobs) - int(0.8 * len(fraud_jobs))) + [0] * (len(clear_jobs) - int(0.8 * len(clear_jobs)))
        train_text, train_y = shuffle(train_text, train_y)
        test_text, test_y = shuffle(test_text, test_y) 

        vectorizer = TfidfVectorizer()
        train_X = vectorizer.fit_transform(train_text)
        test_X = vectorizer.transform(test_text)
        model = LogisticRegression()
        model.fit(train_X, train_y)
        score = model.score(test_X, test_y)
        print(f"Accuracy is {score}")

        pred = model.predict(test_X)
        print(classification_report(test_y, pred))
        filename = 'finalized_model.sav'
        pickle.dump(model, open(filename, 'wb'))
