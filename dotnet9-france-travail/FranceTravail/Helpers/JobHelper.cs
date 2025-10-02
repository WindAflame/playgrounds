namespace FranceTravail.Helpers
{
    /// <summary>
    /// Converter of Entities.FranceTravailAPI.Job to Entities.Job JobConvert.
    /// </summary>
    public class JobHelper
    {
        public static Entities.Job JobConvert(Entities.FranceTravailAPI.Job franceTravailJob)
        {
            var job = new Entities.Job();
            // Model autoincrement Id
            // job.Id = franceTravailJob.Id;
            job.Description = franceTravailJob.Description;
            job.UrlPostulation = franceTravailJob.Contact?.UrlPostulation;
            job.LieuDeTravail = franceTravailJob.LieuTravail.commune;
            job.TypeContrat = franceTravailJob.TypeContrat;
            job.EntrepriseNom = franceTravailJob.Entreprise.Nom;
            return job;
            // modelBuilder
            //     .Entity<Entities.Job>()
            //     .Property(JobConvert => JobConvert.Id)
            //     .ValueGeneratorOnAdd();
        }
    }
}
