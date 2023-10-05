---
title: "14 Light Transport I"
date: 2023-10-05
draft: true
---

$$
f(x) = 2x + 3
$$



https://www.pbr-book.org/3ed-2018/Light_Transport_I_Surface_Reflection/Sampling_Reflection_Functions




  "To actually evaluate the PDF for the cosine-weighted sampling method
  (which we showed earlier was p(w)=cos(theta)/pi)"
  Float BxDF::Pdf(const Vector3f &wo, const Vector3f &wi)
  { const return ωₒ⋅ωᵢ / π; }

  $ x=3 $
  \begin

  \end
  \[
    x=3

  \]

  $$
  x=3
  $$

  [ ] Q: why is the PDF for cosine-weighted sampling cosθ/π?
          https://www.pbr-book.org/3ed-2018/Monte_Carlo_Integration/2D_Sampling_with_Multidimensional_Transformations#Cosine-WeightedHemisphereSampling
            //  trying to find a distrubution such that
            p(ω) ∝ cosθ

            // <proof>
            p(ω) = cosθ/π
            p(θ,ϕ) = cosθsinθ/π

            // <proof, malleys method, jacobian>
            inline Vector3f CosineSampleHemisphere(const Point2f &u) {
                Point2f d = ConcentricSampleDisk(u);
                Float z = std::sqrt(std::max((Float)0, 1 - d.x * d.x - d.y * d.y));
                return Vector3f(d.x, d.y, z);
            }

            float CosineHemispherePdf(float cosTheta) { return cosTheta * InvPi; }

  [ ] Q: why does BxDF::Pdf take two vectors?
    [ ] Q: if "p(ω)=cosθ/π)", isnt there one parameter "θ?"
    [ ] Q: is wi the normal or something?








