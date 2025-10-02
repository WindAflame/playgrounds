using FranceTravail.AppDataContext;
using FranceTravail.Helpers;
using FranceTravail.Entities.FranceTravailAPI;
using FranceTravail.Repositories;
using System.Text.Json;

using var db = new JobsDatabaseSQLiteContext();
// Purge Database
db.Jobs.RemoveRange(db.Jobs);
db.SaveChanges();

// Connect to FranceTravail API : https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire
var context = new FranceTravailContext();
await context.Authenticate();
var jobClient = new FranceTravailJobRepository(context);
// Retrieve list of city : https://api.francetravail.io/partenaire/offresdemploi /v2/referentiel/communes
var cityList = await jobClient.GetCitiesAsync();
// TODO Criteria need to be redifined with client
var searchInCityList = new List<string> { "Rennes", "Bordeaux", "Paris" };
var fitleredCityList = cityList.Where(city => searchInCityList.Any( searchInCity => city.Libelle.ToLower().StartsWith(searchInCity.ToLower())));
Console.WriteLine($"Find {fitleredCityList.Count()} city.");
// Retrieve job in city Rennes, Bordeaux and Paris: https://api.francetravail.io/partenaire/offresdemploi /v2/offres/search
var jobsList = new List<Job>();
foreach (var city in fitleredCityList)
{
    var jobs = await jobClient.GetJobsByCityAsync(city.Code);
    jobsList.AddRange(jobs);
    Console.WriteLine($"Find {jobs.Count()} jobs for city with INSEE code {city.Code} ({city.Libelle}).");
}
// Store job in local db SQLite with Description and URL to sign in
foreach (var job in jobsList)
{
    var dbJob = JobHelper.JobConvert(job);
    db.Add(dbJob);
}
db.SaveChanges();
// Mutate DB with new Job
var newJob = new FranceTravail.Entities.Job();
newJob.Description = "aDescription";
newJob.UrlPostulation = "https://francetravail.io/";
newJob.LieuDeTravail = cityList
    .Where(city => city.Libelle.ToLower().StartsWith("Rennes".ToLower()) && city.Code.StartsWith("35"))
    .First()
    .Code;
newJob.TypeContrat = "CDI";
newJob.EntrepriseNom = "Conserto";
db.Add(newJob);
db.SaveChanges();
// Print JSON with result of search in local DB with selected values Contrat, Entreprise, Pays
var result = 
    from job in db.Jobs
    select new
    {
        job.TypeContrat,
        job.EntrepriseNom,
        job.LieuDeTravail
    };
Console.WriteLine(
    JsonSerializer.Serialize(result.ToList(), new JsonSerializerOptions { WriteIndented = true })
);