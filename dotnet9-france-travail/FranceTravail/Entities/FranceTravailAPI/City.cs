using System.Text.Json.Serialization;

namespace FranceTravail.Entities.FranceTravailAPI
{
    /// <summary>
    /// Definition of a commune from the referential
    /// </summary>
    /// <remarks>
    /// For more information, see:
    /// https://francetravail.io/produits-partages/catalogue/offres-emploi/documentation#/api-reference/operations/recupererReferentielCommunes
    /// </remarks>
    public class City
    {
        [JsonPropertyName("code")]
        public string Code { get; set; }

        [JsonPropertyName("libelle")]
        public string Libelle { get; set; }

        [JsonPropertyName("codePostal")]
        public string CodePostal { get; set; }

        [JsonPropertyName("codeDepartement")]
        public string CodeDepartement { get; set; }

        public override string ToString()
        {
            return $"Code: {Code}, Libelle: {Libelle}, CodePostal: {CodePostal}, CodeDepartement: {CodeDepartement}";
        }
    }
}
