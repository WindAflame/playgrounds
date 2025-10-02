namespace FranceTravail.Entities.FranceTravailAPI
{
    /// <summary>
    /// Format of response with filter on endpoint :
    /// https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search
    /// </summary>
    /// <remarks>
    /// For more information, see:
    /// https://francetravail.io/produits-partages/catalogue/offres-emploi/documentation#/api-reference/operations/recupererReferentielCommunes
    /// </remarks>
    public class JobResponse
    {
        public List<Job> Resultats { get; set; }
        //public List<object> FiltersPossibles { get; set; }
    }
}
